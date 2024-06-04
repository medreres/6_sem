import matplotlib
matplotlib.use('TkAgg')

import matplotlib.pyplot as plt
import copy
from enum import Enum

class PointClassification(Enum):
    CONVEX = 1        # Класифікація точки як конвексна
    CONCAVE = 2       # Класифікація точки як вгнута
    SUPPORTING = 3    # Класифікація точки як опорна
    ERROR = -1        # Класифікація точки як помилкова

class DynamicConvexHull:
    def __init__(self):
        # Ініціалізація верхньої та нижньої границі опуклої оболонки
        self.upper_convex_hull = UpperConvexHull()   # Верхня границя опуклої оболонки
        self.lower_convex_hull = LowerConvexHull()   # Нижня границя опуклої оболонки

    def insert(self, point):
        # Вставка точки в обидві границі опуклої оболонки
        self.upper_convex_hull.insert(point)
        self.lower_convex_hull.insert(point)

    def delete(self, point):
        # Видалення точки з обох границ опуклої оболонки
        self.upper_convex_hull.delete(point)
        self.lower_convex_hull.delete(point)

    def plot(self, figure, axis):
        # Побудова опуклої оболонки на графіку
        self.upper_convex_hull.plot(figure, axis)
        self.lower_convex_hull.plot(figure, axis)

class UpperConvexHull:
    def __init__(self):
        # Ініціалізація дерева для верхньої границі опуклої оболонки
        self.tree = ConvexHullTree()   # Дерево опуклої оболонки

    def insert(self, point):
        # Вставка точки в верхню границю опуклої оболонки
        self.tree.insert(point)

    def delete(self, point):
        # Видалення точки з верхньої границі опуклої оболонки
        self.tree.delete(point)

    def plot(self, figure, axes):
        # Побудова верхньої границі опуклої оболонки на графіку
        return self.tree.plot(figure, axes)

class LowerConvexHull:
    def __init__(self):
        # Ініціалізація дерева для нижньої границі опуклої оболонки
        self.tree = ConvexHullTree()   # Дерево опуклої оболонки

    def insert(self, point):
        # Вставка точки в нижню границю опуклої оболонки
        to_insert = copy.deepcopy(point)
        to_insert.y *= -1    # Відображення точки відносно осі y

        self.tree.insert(to_insert)

    def delete(self, point):
        # Видалення точки з нижньої границі опуклої оболонки
        to_delete = copy.deepcopy(point)
        to_delete.y *= -1    # Відображення точки відносно осі y

        self.tree.delete(to_delete)

    def plot(self, figure, axes):
        # Побудова нижньої границі опуклої оболонки на графіку
        return self.tree.plot(figure, axes, lower=True)
    
class Point:
    i = 0   # Лічильник для ідентифікації точок

    def __init__(self, x, y):
        """
        Ініціалізація точки з координатами (x, y).

        Args:
            x (float): Координата x точки.
            y (float): Координата y точки.
        """
        self.x = x
        self.y = y
        Node.i += 1
        self.id = Node.i   # Унікальний ідентифікатор точки

    def __repr__(self):
        """
        Представлення точки у вигляді рядка.

        Returns:
            str: Рядок, що представляє координати точки.
        """
        return str(f"({self.x}; {self.y})")

    def __lt__(self, other):
        """
        Перевизначення оператора менше для порівняння точок.

        Args:
            other (Point): Інша точка для порівняння.

        Returns:
            bool: Результат порівняння.
        """
        return (self.x, self.y) < (other.x, other.y)


class NodeData:
    def __init__(self, key=None):
        """
        Ініціалізація даних вузла.

        Args:
            key: Ключ вузла.
        """
        self.left_most_right = None   # Лівий найбільший від нижньої границі точок, що розташовані праворуч
        self.left_most_right_point = key   # Точка, що є лівим найбільшим від нижньої границі
        self.points_array = []   # Масив точок
        self.separating_index = 0   # Індекс, що визначає, де розпочинається новий вузол піддерева
        self.convex_hull = []   # Опукла оболонка
        self.graph_hull = []   # Графічне відображення опуклої оболонки
        self.convex_hull.append(key)   # Додавання ключа до опуклої оболонки

    def __lt__(self, other):
        """
        Перевизначення оператора менше для порівняння даних вузлів.

        Args:
            other (NodeData): Інші дані вузла для порівняння.

        Returns:
            bool: Результат порівняння.
        """
        return self.left_most_right_point < other.left_most_right_point

    def __repr__(self):
        """
        Представлення даних вузла у вигляді рядка.

        Returns:
            str: Рядок, що представляє дані вузла.
        """
        return str(f"{self.left_most_right_point}; {self.points_array}; {self.separating_index}")

class NodeColor(Enum):
    RED = 1   # Червоний колір вузла
    BLACK = 2   # Чорний колір вузла

class Node:
    i = 0   # Лічильник для ідентифікації вузлів

    def __init__(self, data):
        """
        Ініціалізація вузла дерева.

        Args:
            data: Дані вузла.
        """
        self.data = data   # Дані вузла
        self.parent = None   # Батьківський вузол
        self.left = None   # Лівий дочірній вузол
        self.right = None   # Правий дочірній вузол
        self.color = NodeColor.RED   # Колір вузла
        self.id = Node.i   # Унікальний ідентифікатор вузла
        Node.i += 1

    def __lt__(self, other):
        """
        Перевизначення оператора менше для порівняння вузлів.

        Args:
            other (Node): Інший вузол для порівняння.

        Returns:
            bool: Результат порівняння.
        """
        return self.data < other.data

    def __repr__(self):
        """
        Представлення вузла у вигляді рядка.

        Returns:
            str: Рядок, що представляє дані вузла.
        """
        return str(f"{self.id}: {self.data}")

    def plot(self, figure, axis, TNULL, lower=False):
        """
        Побудова графіка для візуалізації дерева.

        Args:
            figure: Об'єкт фігури matplotlib.
            axis: Вісь графіка matplotlib.
            TNULL: Порожній вузол.
            lower (bool): Показує, чи є точки нижньою границею (за замовчуванням False).

        Returns:
            tuple: Об'єкти фігури та вісі графіка matplotlib.
        """
        if self is None or self == TNULL:
            return figure, axis

        if self.left == TNULL:
            # Побудова точки лівого найбільшого праворуч
            point_x, point_y = self.data.left_most_right_point.x, self.data.left_most_right_point.y
            point_id = self.data.left_most_right_point.id

            if lower:
                point_y *= -1

            axis.scatter([point_x], [point_y], color="red")
            axis.annotate(f"{point_id}",
                          (point_x, point_y),
                          xytext=(point_x - 0.025, point_y + 0.1))
            return figure, axis

        chain = self.data.graph_hull
        if self.parent == TNULL:
            chain = self.data.points_array

        # Побудова графіку для відображення опуклої оболонки
        for i in range(1, len(chain)):
            if lower:
                axis.plot([chain[i - 1].x, chain[i].x], [-1 * chain[i - 1].y, -1 * chain[i].y], color="blue")
            else:
                axis.plot([chain[i - 1].x, chain[i].x], [chain[i - 1].y, chain[i].y], color="blue")

        if self.left != TNULL:
            self.left.data.graph_hull = chain[:self.data.separating_index + 1] + self.left.data.points_array

        if self.right != TNULL:
            self.right.data.graph_hull = self.right.data.points_array + chain[self.data.separating_index + 1:]

        # Рекурсивне побудова графіку для лівого та правого піддерева
        self.left.plot(figure, axis, TNULL, lower)
        return self.right.plot(figure, axis, TNULL, lower)

class ConvexHullTree:
    def __init__(self):
        """
        Ініціалізація дерева опуклої оболонки.
        """
        self.TNULL = Node(NodeData())   # Порожній вузол
        self.TNULL.color = NodeColor.BLACK   # Колір порожнього вузла
        self.TNULL.left = None   # Лівий дочірній вузол порожнього вузла
        self.TNULL.right = None   # Правий дочірній вузол порожнього вузла
        self.root = self.TNULL   # Корінь дерева, спочатку порожній

    def insert(self, key):
        """
        Вставка нового вузла у дерево.

        Args:
            key: Ключ вузла для вставки.
        """
        node = Node(NodeData(key))   # Створення нового вузла з даними

        # Ініціалізація кольору та дочірніх вузлів нового вузла
        node.parent = None
        node.data.left_most_right = node
        node.left = self.TNULL
        node.right = self.TNULL
        node.color = NodeColor.RED

        x = self.root   # Початковий вузол для пошуку місця вставки нового вузла

        if x == self.TNULL:
            self.root = node
            return

        left_neighbour, right_neighbour = self.down(x, key)   # Пошук лівого та правого сусідів для нового вузла

        new_node_parent = Node(NodeData())   # Створення батьківського вузла для нового вузла
        node.parent = new_node_parent

        # Логіка вставки нового вузла залежно від наявності сусідів
        if left_neighbour is None:
            # Вставка нового вузла без лівого сусіда
            new_node_parent.left = node
            new_node_parent.right = right_neighbour

            new_node_parent.parent = right_neighbour.parent
            if right_neighbour.parent is None:
                self.root = new_node_parent
                new_node_parent.parent = self.TNULL
            else:
                right_neighbour.parent.left = new_node_parent

            right_neighbour.parent = new_node_parent

        elif right_neighbour is None:
            # Вставка нового вузла без правого сусіда
            new_node_parent.right = node
            new_node_parent.left = left_neighbour

            new_node_parent.parent = left_neighbour.parent
            if left_neighbour.parent is None:
                self.root = new_node_parent
                new_node_parent.parent = self.TNULL
            else:
                left_neighbour.parent.right = new_node_parent

            left_neighbour.parent = new_node_parent

        elif self.find_brother(left_neighbour)[0] == right_neighbour:
            # Вставка нового вузла між лівим та правим сусідами
            new_node_parent.left = left_neighbour
            new_node_parent.right = node

            new_node_parent.parent = left_neighbour.parent
            left_neighbour.parent.left = new_node_parent

            left_neighbour.parent = new_node_parent
        else:
            # Вставка нового вузла праворуч від правого сусіда
            new_node_parent.left = node
            new_node_parent.right = right_neighbour

            new_node_parent.parent = right_neighbour.parent

            neighbour_side = self.node_side(right_neighbour)
            if neighbour_side == -1:
                right_neighbour.parent.left = new_node_parent
            else:
                right_neighbour.parent.right = new_node_parent

            right_neighbour.parent = new_node_parent

        self.up(node)   # Оновлення дерева після вставки нового вузла

    def node_side(self, node):
        """
        Визначення сторони, на якій знаходиться вузол щодо батьківського вузла.

        Args:
            node (Node): Вузол для визначення сторони.

        Returns:
            int: -1, якщо вузол знаходиться ліворуч; 1, якщо вузол знаходиться праворуч; 0, якщо вузол є коренем або вузол невідомої сторони.
        """
        if node.parent.left == node:
            return -1
        elif node.parent.right == node:
            return 1
        else:
            return 0

    def down(self, current_node: Node, point: Point, left_neighbour: Node=None, right_neighbour: Node=None):
        """
        Пошук лівого та правого сусідів для вузла у дереві.

        Args:
            current_node (Node): Поточний вузол у дереві.
            point (Point): Точка для порівняння та пошуку сусідів.
            left_neighbour (Node, optional): Лівий сусід (за замовчуванням None).
            right_neighbour (Node, optional): Правий сусід (за замовчуванням None).

        Returns:
            tuple: Лівий та правий сусіди вузла.
        """
        if current_node.left == self.TNULL:
            # Перевірка, чи досягнуто кінця дерева
            if point.x <= current_node.data.left_most_right_point.x:
                right_neighbour = current_node
            else:
                left_neighbour = current_node
            return left_neighbour, right_neighbour

        # Побудова черг для лівого та правого сина
        left_queue = current_node.data.convex_hull[:current_node.data.separating_index + 1]
        right_queue = current_node.data.convex_hull[current_node.data.separating_index + 1:]

        left_son = current_node.left
        right_son = current_node.right

        # Оновлення опуклої оболонки для синів
        if left_son.left != self.TNULL:
            left_son.data.convex_hull = left_queue + left_son.data.points_array

        if right_son.left != self.TNULL:
            right_son.data.convex_hull = right_son.data.points_array + right_queue

        # Визначення напрямку руху в дереві
        if point.x <= current_node.data.left_most_right_point.x:
            right_neighbour = current_node
            current_node = current_node.left
        else:
            left_neighbour = current_node.data.left_most_right
            current_node = current_node.right

        return self.down(current_node, point, left_neighbour, right_neighbour)

    def up(self, current_node: Node):
        """
        Оновлення даних вузла після вставки нового вузла у дерево.

        Args:
            current_node (Node): Поточний вузол у дереві.
        """
        if current_node == self.get_root():
            current_node.data.points_array = current_node.data.convex_hull
            return

        current_brother, side = self.find_brother(current_node)

        # Злиття опуклих оболонок братів
        q_1, q_2, q_3, q_4, j = [], [], [], [], 0
        if side == -1:
            q_1, q_2, q_3, q_4, j = merge_chains(current_brother.data.convex_hull, current_node.data.convex_hull)
        elif side == 1:
            q_1, q_2, q_3, q_4, j = merge_chains(current_node.data.convex_hull, current_brother.data.convex_hull)

        # Оновлення опуклої оболонки та індексу розділення для батька
        current_node.parent.left.data.points_array = q_2
        current_node.parent.right.data.points_array = q_3

        current_node.parent.data.convex_hull = q_1 + q_4
        current_node.parent.data.separating_index = j

        # Оновлення лівого найбільшого праворуч для батька
        current_node.parent.data.left_most_right = self.find_left_most_right(current_node.parent)
        current_node.parent.data.left_most_right_point = current_node.parent.data.left_most_right.data.left_most_right_point

        self.up(current_node.parent)

    def find_brother(self, node: Node):
        # Функція для пошуку брата вузла.
        if node.parent.left == node:
            return node.parent.right, 1  # Якщо вузол є лівим дитинцем, його брат знаходиться справа.
        elif node.parent.right == node:
            return node.parent.left, -1  # Якщо вузол є правим дитинцем, його брат знаходиться зліва.
        return self.TNULL  # Повертаємо спеціальне значення, якщо брат не знайдений.

    def find_left_most_right(self, node: Node):
        # Функція для пошуку найлівішого найбільшого праворуч вузла.
        current_node = node

        if current_node.left != self.TNULL:
            current_node = current_node.left  # Переміщуємось вліво до кінця дерева.

        while current_node.right != self.TNULL:
            current_node = current_node.right  # Переміщуємось праворуч до кінця дерева.

        return current_node.data.left_most_right  # Повертаємо найлівіший найбільший праворуч вузол.

    def get_root(self):
        # Функція для отримання кореневого вузла дерева.
        return self.root  # Повертаємо кореневий вузол дерева.

    def delete(self, data):
        # Функція для видалення вузла з дерева.
        node = Node(NodeData(data))
        node.parent = None
        node.data.left_most_right = node
        node.left = self.TNULL
        node.right = self.TNULL
        node.color = NodeColor.RED

        x = self.root

        _, to_delete_node = self.down(x, data)

        if to_delete_node == self.get_root():
            self.root = self.TNULL  # Якщо вузол для видалення - кореневий, кореневий вузол стає TNULL.
        elif to_delete_node.parent.parent == self.TNULL:
            brother, _ = self.find_brother(to_delete_node)

            brother.data.points_array = brother.data.convex_hull

            self.root = brother
            brother.parent = self.TNULL  # Якщо вузол має одного з дітей, то його брат стає кореневим вузлом.
        else:
            node_parent = to_delete_node.parent
            brother, _ = self.find_brother(to_delete_node)

            side = self.node_side(node_parent)

            if side == -1:
                node_parent.parent.left = brother
            elif side == 1:
                node_parent.parent.right = brother

            brother.parent = node_parent.parent
            self.up(brother)  # Викликаємо функцію відновлення структури після видалення вузла.

    def plot(self, fig, ax, lower=False):
        # Функція для побудови графічного представлення дерева.
        return self.get_root().plot(fig, ax, self.TNULL, lower=lower)  # Викликаємо функцію побудови графіку для кореневого вузла.

def merge_chains(chain_1: [], chain_2: []):
    # Функція для злиття двох послідовностей точок у ланцюжок.

    # Якщо ланцюжок chain_2 має лише одну точку:
    if len(chain_2) == 1:
        # Якщо ланцюжок chain_1 також має лише одну точку:
        if len(chain_1) == 1:
            # Повертаємо ланцюжок chain_1, оскільки chain_2 має лише одну точку, і немає потреби в злитті.
            return chain_1, [], [], chain_2, 0

        # Якщо ланцюжок chain_1 має дві точки:
        if len(chain_1) == 2:
            # Перевіряємо, чи точка з ланцюжка chain_2 лівіше за лінію, утворену ланцюжком chain_1.
            if is_point_left(chain_1[0], chain_1[1], chain_2[0]):
                # Якщо так, повертаємо першу точку з chain_1 та інші точки з chain_1 як окремий ланцюжок.
                return chain_1[:1], chain_1[1:], [], chain_2, 0
            else:
                # Якщо ні, повертаємо обидва ланцюжки як єдиний ланцюжок.
                return chain_1, [], [], chain_2, 1

    # Якщо ланцюжок chain_1 має лише одну точку:
    if len(chain_1) == 1:
        # Перевіряємо, чи точка з ланцюжка chain_2 лівіше за лінію, утворену ланцюжком chain_1.
        if is_point_left(chain_2[0], chain_2[1], chain_1[0]):
            # Якщо так, повертаємо першу точку з chain_1 та інші точки з chain_2 як окремий ланцюжок.
            return chain_1, [], chain_2[:1], chain_2[1:], 0
        else:
            # Якщо ні, повертаємо обидва ланцюжки як єдиний ланцюжок.
            return chain_1, [], [], chain_2, 0

    # Ініціалізуємо змінні для подальших обчислень.
    index_1 = int((len(chain_1) - 1) / 2)
    index_2 = int((len(chain_2) - 1) / 2)

    temp_min_1 = 0
    temp_max_1 = len(chain_1) - 1

    temp_min_2 = 0
    temp_max_2 = len(chain_2) - 1

    # Починаємо ітерацію по обом ланцюжкам.
    while True:
        # Ініціалізуємо змінні для визначення екстремальних точок.
        extreme_left_1 = False
        extreme_right_1 = False

        extreme_left_2 = False
        extreme_right_2 = False

        # Визначаємо, чи є поточні індекси крайніми.
        if index_1 == temp_min_1:
            extreme_left_1 = True
        if index_1 == temp_max_1:
            extreme_right_1 = True

        if index_2 == temp_min_2:
            extreme_left_2 = True
        if index_2 == temp_max_2:
            extreme_right_2 = True

        # Ініціалізуємо типи точок для перевірки опуклості.
        type_1 = PointClassification.ERROR
        type_2 = PointClassification.ERROR

        # Визначаємо типи точок залежно від їх положення у ланцюжку та порівнюємо їх з екстремальними точками.
        if extreme_left_1 and extreme_right_1:
            type_1 = PointClassification.SUPPORTING
        elif extreme_left_1:
            type_1 = define_point_type_left(Point(chain_1[index_1].x, chain_1[index_1].y - 1),
                                            chain_1[index_1],
                                            chain_1[index_1 + 1], chain_2[index_2])
        elif extreme_right_1:
            type_1 = define_point_type_left(chain_1[index_1 - 1], chain_1[index_1],
                                            Point(chain_1[index_1].x, chain_1[index_1].y - 1),
                                            chain_2[index_2])
        else:
            type_1 = define_point_type_left(chain_1[index_1 - 1], chain_1[index_1], chain_1[index_1 + 1],
                                            chain_2[index_2])

        if extreme_left_2 and extreme_right_2:
            type_2 = PointClassification.SUPPORTING
        elif extreme_left_2:
            type_2 = define_point_type_right(Point(chain_2[index_2].x, chain_2[index_2].y - 1),
                                             chain_2[index_2],
                                             chain_2[index_2 + 1], chain_1[index_1])
        elif extreme_right_2:
            type_2 = define_point_type_right(chain_2[index_2 - 1], chain_2[index_2],
                                             Point(chain_2[index_2].x, chain_2[index_2].y - 1),
                                             chain_1[index_1])
        else:
            type_2 = define_point_type_right(chain_2[index_2 - 1], chain_2[index_2], chain_2[index_2 + 1],
                                             chain_1[index_1])
        # Якщо обидва типи точок є впадинами (CONCAVE), перевіряємо взаємне розташування точок.
        if type_1 == PointClassification.CONCAVE and type_2 == PointClassification.CONCAVE:
            # Перевіряємо результат перевірки впадин.
            check_result = concave_concave_case(chain_1[index_1], chain_1[index_1 + 1], chain_1[temp_max_1],
                                                chain_2[temp_min_2], chain_2[index_2 - 1], chain_2[index_2])
            # Обробляємо випадки результату перевірки:
            if check_result == -1:
                # Якщо результат -1, зміщуємо мінімальний індекс для chain_1.
                temp_min_1 = index_1
                if temp_max_1 - index_1 != 1:
                    index_1 = int((index_1 + temp_max_1) / 2)
                else:
                    index_1 = temp_max_1
            elif check_result == 1:
                # Якщо результат 1, зміщуємо максимальний індекс для chain_2.
                temp_max_2 = index_2
                index_2 = int((temp_min_2 + index_2) / 2)
            else:
                # Якщо результат 0, зміщуємо індекси для обох ланцюжків.
                temp_min_1 = index_1
                if temp_max_1 - index_1 != 1:
                    index_1 = int((index_1 + temp_max_1) / 2)
                else:
                    index_1 = temp_max_1
                temp_max_2 = index_2
                index_2 = int((temp_min_2 + index_2) / 2)

        # Обробка різних комбінацій типів точок:
        elif type_1 == PointClassification.CONCAVE and type_2 == PointClassification.SUPPORTING:
            # Якщо одна точка є впадиною (CONCAVE), а інша - опорною (SUPPORTING),
            # зміщуємо мінімальний індекс для chain_1 та мінімальний індекс для chain_2.
            temp_min_1 = index_1
            if temp_max_1 - index_1 != 1:
                index_1 = int((index_1 + temp_max_1) / 2)
            else:
                index_1 = temp_max_1

            temp_min_2 = index_2

        elif type_1 == PointClassification.CONCAVE and type_2 == PointClassification.CONVEX:
            # Якщо одна точка є впадиною (CONCAVE), а інша - виступом (CONVEX),
            # зміщуємо мінімальний індекс для chain_2.
            temp_min_2 = index_2
            if temp_max_2 - index_2 != 1:
                index_2 = int((index_2 + temp_max_2) / 2)
            else:
                index_2 = temp_max_2

        elif type_1 == PointClassification.SUPPORTING and type_2 == PointClassification.CONCAVE:
            # Якщо одна точка є опорною (SUPPORTING), а інша - впадиною (CONCAVE),
            # зміщуємо максимальний індекс для chain_1 та мінімальний індекс для chain_2.
            temp_max_1 = index_1
            temp_max_2 = index_2
            index_2 = int((temp_min_2 + index_2) / 2)

        # Подібно обробляються інші можливі комбінації типів точок.
        # Відповідно зміщуються відповідні індекси.

        # Якщо обидва ланцюжки є опорними (SUPPORTING), завершуємо цикл.
        elif type_1 == PointClassification.SUPPORTING and type_2 == PointClassification.SUPPORTING:
            break

        # Якщо одна точка є виступом (CONVEX), а інша - впадиною (CONCAVE),
        # зміщуємо максимальний індекс для chain_1.
        elif type_1 == PointClassification.SUPPORTING and type_2 == PointClassification.CONVEX:
            temp_max_1 = index_1
            temp_min_2 = index_2
            if temp_max_2 - index_2 != 1:
                index_2 = int((index_2 + temp_max_2) / 2)
            else:
                index_2 = temp_max_2

        elif type_1 == PointClassification.CONVEX and type_2 == PointClassification.CONCAVE:
            temp_max_1 = index_1
            # Якщо одна точка є виступом (CONVEX), а інша - впадиною (CONCAVE),
            # зміщуємо максимальний індекс для chain_1 і розраховуємо новий середній індекс.
            index_1 = int((temp_min_1 + index_1) / 2)

        elif type_1 == PointClassification.CONVEX and type_2 == PointClassification.SUPPORTING:
            # Якщо одна точка є виступом (CONVEX), а інша - опорною (SUPPORTING),
            # зміщуємо максимальний індекс для chain_1 і розраховуємо новий середній індекс.
            temp_max_1 = index_1
            index_1 = int((temp_min_1 + index_1) / 2)

            temp_min_2 = index_2

        elif type_1 == PointClassification.CONVEX and type_2 == PointClassification.CONVEX:
            # Якщо обидва типи є виступами (CONVEX), зміщуємо максимальний індекс для chain_1
            # і розраховуємо новий середній індекс для chain_2.
            temp_max_1 = index_1
            index_1 = int((temp_min_1 + index_1) / 2)

            temp_min_2 = index_2
            if temp_max_2 - index_2 != 1:
                index_2 = int((index_2 + temp_max_2) / 2)
            else:
                index_2 = temp_max_2

    # Повертаємо оброблені ланцюжки та індекс перетину.
    return chain_1[:index_1 + 1], chain_1[index_1 + 1:], chain_2[:index_2], chain_2[index_2:], index_1

def concave_concave_case(q1, q1_successor, max_left, min_right, q2_predecessor, q2):
    # Знаходимо середню вертикальну лінію між максимальною лівою та мінімальною правою точками.
    center_line_x = (max_left.x + min_right.x) / 2
    # Порівнюємо x-координати точки перетину q1-q1_successor і q2_predecessor-q2 з центральною лінією.
    if get_intersection_point(q1, q1_successor, q2_predecessor, q2).x < center_line_x:
        return -1  # Якщо точка перетину знаходиться лівіше центральної лінії, повертаємо -1.
    elif get_intersection_point(q1, q1_successor, q2_predecessor, q2).x > center_line_x:
        return 1   # Якщо точка перетину знаходиться правіше центральної лінії, повертаємо 1.
    else:
        return 0   # Якщо точка перетину знаходиться на центральній лінії, повертаємо 0.

def get_intersection_point(a, b, c, d):
    # Обчислюємо точку перетину прямих a-b і c-d за допомогою формул Крамера.
    return Point(((a.x * b.y - a.y * b.x) * (c.x - d.x) - (a.x - b.x) * (c.x * d.y - c.y * d.x))
                 / ((a.x - b.x) * (c.y - d.y) - (a.y - b.y) * (c.x - d.x)),
                 ((a.x * b.y - a.y * b.x) * (c.y - d.y) - (a.y - b.y) * (c.x * d.y - c.y * d.x))
                 / ((a.x - b.x) * (c.y - d.y) - (a.y - b.y) * (c.x - d.x)))

def define_point_type_left(q1_pred: Point, q1: Point, q1_suc: Point, q2: Point):
    # Визначаємо тип точки q1 за відношенням до q2, використовуючи лівостороннє орієнтування.
    if is_point_left(q2, q1, q1_pred) and is_point_left(q2, q1, q1_suc):
        return PointClassification.SUPPORTING   # Якщо q1 є впадиною і знаходиться всередині q2, то q1 - опорна.
    if is_point_left(q2, q1, q1_pred) and not is_point_left(q2, q1, q1_suc):
        return PointClassification.CONCAVE   # Якщо q1 є впадиною, але не знаходиться всередині q2, то q1 - впадина.
    else:
        return PointClassification.CONVEX   # В іншому випадку q1 - виступ.

def define_point_type_right(q2_pred: Point, q2: Point, q2_suc: Point, q1: Point):
    # Визначаємо тип точки q2 за відношенням до ланцюжка q1, використовуючи правостороннє орієнтування.
    if not is_point_left(q1, q2, q2_pred) and not is_point_left(q1, q2, q2_suc):
        return PointClassification.SUPPORTING   # Якщо q2 є опорною і знаходиться всередині q1, то q2 - опорна.
    if is_point_left(q1, q2, q2_pred) and not is_point_left(q1, q2, q2_suc):
        return PointClassification.CONCAVE   # Якщо q2 є впадиною, але не знаходиться всередині q1, то q2 - впадина.
    else:
        return PointClassification.CONVEX   # В іншому випадку q2 - виступ.


def is_point_left(chain_point_1, chain_point_2, point):
    # Перевіряємо, чи знаходиться точка зліва від відрізка, утвореного двома іншими точками.
    return ((chain_point_2.x - chain_point_1.x) * (point.y - chain_point_1.y) - (chain_point_2.y - chain_point_1.y) * (
        point.x - chain_point_1.x)) >= 0

def main():
    points_set = [
        Point(0, 0),
        Point(2, 2),
        Point(5, 3),
        Point(6, 4),
        Point(8, 2),
        Point(10, 3),
        Point(13, 4),
        Point(14, 3),
        Point(18, 3),
        Point(20, 1)
    ]

    dynamic_convex_hull = DynamicConvexHull()

    for point in points_set:
        dynamic_convex_hull.insert(point)

    figure, axis = plt.subplots(nrows=1, ncols=1, figsize=(5, 5))
    dynamic_convex_hull.plot(figure, axis)

    dynamic_convex_hull.insert(Point(17, 5))
    # dynamic_convex_hull.delete(Point(-1, 2))
    # dynamic_convex_hull.delete(Point(3, 2))
    # dynamic_convex_hull.delete(Point(2, 1.5))
    # dynamic_convex_hull.delete(Point(3, 2))

    figure, axis = plt.subplots(nrows=1, ncols=1, figsize=(5, 5))
    dynamic_convex_hull.plot(figure, axis)

    plt.show()


if __name__ == "__main__":
    main()
