import matplotlib.pyplot as plt
import heapq
from decimal import Decimal
from enum import Enum
from bstree import BSTree

ZERO = Decimal()
INF = Decimal("inf")

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __lt__(self, other):
        return [self.x, self.y] < [other.x, other.y]  # Порівнює точки

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y  # Перевіряє рівність точок

    def __hash__(self):
        return hash((self.x, self.y))  # Хеш точки

    def __str__(self):
        return f"({self.x}; {self.y})"  # Рядкове представлення точки

class Segment:
    def __init__(self, begin, end):
        self.begin = min(begin, end)  # Початкова точка сегмента
        self.end = max(begin, end)  # Кінцева точка сегмента

    def __eq__(self, other):
        return self.begin == other.begin and self.end == other.end  # Перевіряє рівність сегментів

    def __hash__(self):
        return hash((self.begin, self.end))  # Хеш сегмента

    def __str__(self):
        return f"{self.begin} -> {self.end}"  # Рядкове представлення сегмента

    def plot(self):
        plt.plot(
            [self.begin.x, self.end.x],
            [self.begin.y, self.end.y],
            "-b"
        )  # Графічне відображення сегмента

    def value(self, x):
        k, b = self.to_line()  # Отримує параметри рівняння прямої

        return k * x + b  # Обчислює значення Y для заданого X

    def to_line(self):
        dx = self.end.x - self.begin.x

        # У випадку, коли dx == 0, сегмент паралельний осі Y, тому повертаємо x=b, де b - початкова X-координата
        if dx == ZERO:
            return INF, self.begin.x

        dy = self.end.y - self.begin.y
        k = dy / dx  # Коефіцієнт нахилу прямої
        b = self.begin.y - k * self.begin.x  # Зсув прямої по осі Y

        return k, b

    def projections_contain(self, point):
        x_begin, x_end = self.__projection("x")  # Проекція сегмента на вісь X
        y_begin, y_end = self.__projection("y")  # Проекція сегмента на вісь Y

        return x_begin <= point.x <= x_end and y_begin <= point.y <= y_end  # Перевірка, чи містить проекція точку

    def __projection(self, axis):
        if axis == "x":
            return min(self.begin.x, self.end.x), max(self.begin.x, self.end.x)  # Проекція на вісь X

        return min(self.begin.y, self.end.y), max(self.begin.y, self.end.y)  # Проекція на вісь Y

    def get_endpoints(self):
        return self.begin, self.end  # Повертає початкову і кінцеву точки сегмента

class Utils:
    @staticmethod
    def find_intersection(first, second):
        """
        Знаходить точку перетину між двома сегментами.
        
        Args:
            first (Segment): Перший сегмент.
            second (Segment): Другий сегмент.
            
        Returns:
            Point або None: Повертає точку перетину, якщо вона існує,
            або None, якщо сегменти не перетинаються або один з них є None.
        """
        if first is None or second is None:
            return None

        k_1, b_1 = first.to_line()  # Отримує коефіцієнти першого сегмента
        k_2, b_2 = second.to_line()  # Отримує коефіцієнти другого сегмента

        if k_1 == k_2:  # Якщо коефіцієнти нахилу однакові, прямі паралельні
            return None

        if k_1 == INF:
            x = b_1
            y = k_2 * x + b_2
        elif k_2 == INF:
            x = b_2
            y = k_1 * x + b_1
        else:
            x = (b_2 - b_1) / (k_1 - k_2)
            y = k_1 * (b_2 - b_1) / (k_1 - k_2) + b_1

        intersection = Point(x, y)  # Створює точку перетину

        # Перевіряє, чи точка перетину знаходиться на обох сегментах
        if first.projections_contain(intersection) \
                and second.projections_contain(intersection):
            return intersection  # Повертає точку перетину

        return None  # Якщо сегменти не перетинаються, повертає None

class EventType(Enum):
    BEGIN = 1
    END = 2
    INTERSECTION = 3

class Event:
    def __init__(self, point, segments, event_type):
        self.point = point
        self.segments = segments
        self.event_type = event_type

    def __lt__(self, other):
        return self.point < other.point  # Порівнює події за точками

class SegmentComparator:
    def __init__(self, x=ZERO):
        self.x = x

    def key(self, segment):
        return segment.value(self.x)  # Ключ для порівняння сегментів за значенням Y в точці x

class StatusStructure:
    def __init__(self):
        self.comparator = SegmentComparator()  # Компаратор для порівняння сегментів
        self.tree = BSTree()  # Бінарне дерево пошуку для зберігання сегментів
        self.segments = dict()  # Словник для швидкого доступу до вузлів дерева по сегментам

    def set_x(self, x):
        self.comparator.x = x  # Встановлює значення x для порівняння

    def insert(self, segment):
        inserted_node = self.tree.insert(segment,
                                         lambda e, c=self.comparator: c.key(e))  # Вставляє сегмент у дерево
        self.segments[segment] = inserted_node

    def delete(self, segment):
        node_to_delete = self.segments[segment]
        self.tree.remove(node_to_delete)  # Видаляє сегмент з дерева
        self.segments.pop(segment)  # Видаляє сегмент зі словника

    def next(self, segment):
        node = self.segments[segment]
        next_node = self.tree.successor(node)  # Знаходить наступний сегмент

        if next_node is None:
            return None

        return next_node.value

    def prev(self, segment):
        node = self.segments[segment]
        prev_node = self.tree.predecessor(node)  # Знаходить попередній сегмент

        if prev_node is None:
            return None

        return prev_node.value

    def swap(self, lhs, rhs):
        if lhs not in self.segments and rhs not in self.segments:
            return

        lhs_node = self.segments[lhs]
        rhs_node = self.segments[rhs]

        lhs_node.value, rhs_node.value = rhs_node.value, lhs_node.value  # Міняє місцями сегменти в дереві
        self.segments[lhs], self.segments[rhs] = rhs_node, lhs_node

class IntersectionDeterminator:
    def __init__(self, segments):
        self.segments = segments
        self.event_queue = []
        self.status = StatusStructure()
        self.result = []

    def demo(self):
        self.__plot_segments()  # Графічне відображення сегментів
        self.__init_event_queue()  # Ініціалізація черги подій
        self.__find_intersections()  # Знаходження перетинів
        self.__plot_intersections()  # Графічне відображення перетинів
        self.__report()  # Виведення результатів

        plt.show()

    def __plot_segments(self):
        for segment in self.segments:
            segment.plot()  # Графічне відображення кожного сегмента

    def __init_event_queue(self):
        for segment in self.segments:
            begin, end = segment.get_endpoints()
            self.event_queue.append(Event(begin, (segment,), EventType.BEGIN))  # Подія початку сегмента
            self.event_queue.append(Event(end, (segment,), EventType.END))  # Подія кінця сегмента

        heapq.heapify(self.event_queue)  # Сортуємо чергу подій

    def __find_intersections(self):
        while len(self.event_queue) != 0:
            event = heapq.heappop(self.event_queue)  # Беремо першу подію з черги
            point = event.point
            self.status.set_x(point.x)  # Встановлюємо значення x

            if event.event_type == EventType.BEGIN:
                self.__handle_begin_event(event)  # Обробка події початку сегмента
            elif event.event_type == EventType.END:
                self.__handle_end_event(event)  # Обробка події кінця сегмента
            elif event.event_type == EventType.INTERSECTION:
                self.__handle_intersection_event(event)  # Обробка події перетину сегментів

    def __handle_begin_event(self, event):
        segment = event.segments[0]
        self.status.insert(segment)  # Вставляємо сегмент у статусну структуру

        segment_above = self.status.next(segment)  # Сегмент вище поточного
        segment_below = self.status.prev(segment)  # Сегмент нижче поточного

        above_current = Utils.find_intersection(segment_above, segment)  # Перевірка перетину з сегментом вище
        below_current = Utils.find_intersection(segment_below, segment)  # Перевірка перетину з сегментом нижче

        if above_current is not None:
            self.__add_event(
                Event(above_current,
                      (segment, segment_above),
                      EventType.INTERSECTION)
            )  # Додаємо подію перетину

        if below_current is not None:
            self.__add_event(
                Event(below_current,
                      (segment_below, segment),
                      EventType.INTERSECTION)
            )  # Додаємо подію перетину

    def __add_event(self, event):
        heapq.heappush(self.event_queue, event)  # Додаємо подію у чергу

    def __handle_end_event(self, event):
        point = event.point
        segment = event.segments[0]
        segment_above = self.status.next(segment)  # Сегмент вище поточного
        segment_below = self.status.prev(segment)  # Сегмент нижче поточного

        self.status.delete(segment)  # Видаляємо сегмент зі статусної структури

        above_below = Utils.find_intersection(segment_above, segment_below)  # Перевірка перетину сегментів вище і нижче

        if above_below is not None \
        and point.x < above_below.x \
        and self.__is_not_in_queue(above_below):
            # Якщо існує точка перетину нижче поточного і вона знаходиться лівіше за поточну точку
            # перетину, і ця точка ще не знаходиться у черзі подій
            self.__add_event(
                Event(above_below,
                    (segment_below, segment_above),
                    EventType.INTERSECTION)
            )  # Додаємо подію перетину між сегментами нижчим та вищим за поточний

    def __is_not_in_queue(self, point):
        return next(
            (e for e in self.event_queue if e.point == point),
            None
        ) is None  # Перевіряємо, чи точка не вже є в черзі подій

    def __handle_intersection_event(self, event):
        point = event.point
        self.result.append(point)  # Додаємо точку перетину до результатів

        lhs, rhs = event.segments
        self.status.swap(lhs, rhs)  # Міняємо місцями сегменти в статусній структурі

        segment_above = self.status.next(lhs)  # Сегмент вище першого
        segment_below = self.status.prev(rhs)  # Сегмент нижче другого

        above_lhs = Utils.find_intersection(segment_above, lhs)  # Перевірка перетину з сегментом вище першого
        below_rhs = Utils.find_intersection(segment_below, rhs)  # Перевірка перетину з сегментом нижче другого

        if above_lhs is not None \
        and point.x < above_lhs.x \
        and self.__is_not_in_queue(above_lhs):
            # Якщо існує точка перетину вище першого сегмента та вона знаходиться лівіше за поточну
            # точку перетину, і ця точка перетину ще не знаходиться у черзі подій
            self.__add_event(
                Event(above_lhs, (lhs, segment_above), EventType.INTERSECTION)
            )  # Додаємо подію перетину між першим сегментом та сегментом вищим за нього
        # Додаємо подію перетину

        if below_rhs is not None \
            and point.x < below_rhs.x \
            and self.__is_not_in_queue(below_rhs):
            # Якщо існує точка перетину нижче другого сегмента та вона знаходиться лівіше за поточну
            # точку перетину, і ця точка перетину ще не знаходиться у черзі подій
            self.__add_event(
                Event(below_rhs, (segment_below, rhs), EventType.INTERSECTION)
            )  # Додаємо подію перетину між сегментом нижчим за другий та другим сегментом

    def __plot_intersections(self):
        for point in self.result:
            plt.scatter(point.x, point.y, color="red")  # Графічне відображення точок перетину

    def __report(self):
        print(f"Count: {len(self.result)}")  # Вивід кількості перетинів
        print("Intersections: ")

        for point in self.result:
            print(point)  # Вивід кожної точки перетину

def create_segment(x_begin, y_begin, x_end, y_end):
    return Segment(Point(Decimal(x_begin),
                         Decimal(y_begin)),
                   Point(Decimal(x_end),
                         Decimal(y_end)))  # Створення сегмента

def main():
    segments = [
        create_segment(-3, 0, 2, 1),
        create_segment(1, 5, 3, 3),
        create_segment(0, 5, 2, 0),
        create_segment(1, 2, 2, 7),
        create_segment(-2, 1, 3, 0),
        create_segment(3, 5, -3, -1),
        create_segment(-0.5, -1, 0, 3),
        create_segment(0, 4, 1, 7),
        create_segment(-4, -0.5, 3, -0.5),
        create_segment(-1, 4.5, 1.5, 0),
        create_segment(-2, 3.5, 4, 3.5),
        create_segment(2, 5, 4, 2),
        create_segment(2, -1, 4, 5),
        create_segment(-1, 3, -0.5, 5),
        create_segment(0, -1, 8, 10)
    ]  # Створення списку сегментів

    intersection_determinator = IntersectionDeterminator(segments)
    intersection_determinator.demo()  # Виконання алгоритму знаходження перетинів

if __name__ == "__main__":
    main()
