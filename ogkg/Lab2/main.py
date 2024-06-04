from enum import IntEnum
from matplotlib import pyplot as plt
from matplotlib import patches as patches

class Dim(IntEnum):
    VERTICAL = 0
    HORIZONTAL = 1

# Клас вузла дерева
class TreeNode:
    def __init__(self):
        self.left = None  # Лівий дочірній вузол
        self.right = None  # Правий дочірній вузол
        self.point_index = None  # Індекс точки в початковому масиві
        self.point = None  # Сама точка
        self.line_dim = None  # Напрямок лінії, яка розділяє вузли

# Функція, що розділяє список точок на дві групи за заданим списком відсортованих точок
def sortedListSplit(left_list, right_list, to_split_list):
    if not to_split_list:
        return [], []
    sep_flags = [2] * (max(to_split_list) + 1)
    for p in left_list:
        sep_flags[p] = 0
    for p in right_list:
        if sep_flags[p] != 2:
            raise Exception("_sorted_list_split")
        sep_flags[p] = 1
    split = [[], [], []]
    for p in to_split_list:
        split[sep_flags[p]].append(p)
    return split[0], split[1]

# Повертає координату точки вузла дерева node визначену за вказаним напрямком node.line_dim.
def getM(node):
    return node.point[node.line_dim]

# Функція, що визначає, чи знаходиться точка всередині прямокутника
def isInsideOfRect(point, x_range, y_range):
    return (x_range[0] <= point[0] <= x_range[1]) and (y_range[0] <= point[1] <= y_range[1])

# Рекурсивна функція побудови дерева
def _preprocessing(points, dim_points, non_dim_points, dim):
    if not dim_points:
        return None
    # Обчислення індексу середньої точки
    m_index = (len(dim_points) - 1) // 2
    m = dim_points[m_index]

    # Розділення точок на ліві та праві відносно середньої
    left_dim_points, right_dim_points = dim_points[:m_index], dim_points[m_index + 1:]
    left_non_dim_points, right_non_dim_points = sortedListSplit(left_dim_points, right_dim_points, non_dim_points)
    
    # Визначення наступного виміру для подальшого розгалуження
    next_dim = Dim.HORIZONTAL if dim == Dim.VERTICAL else Dim.VERTICAL

    # Створення вузла дерева
    node = TreeNode()
    node.point_index = m
    node.point = points[m]
    node.line_dim = dim
    node.left = _preprocessing(points, left_non_dim_points, left_dim_points, next_dim)
    node.right = _preprocessing(points, right_non_dim_points, right_dim_points, next_dim)
    return node

# Функція попередньої обробки даних для побудови дерева
def preprocessing(points):
    # Створення списків індексів точок, впорядкованих за координатами X та Y
    x = y = list(range(len(points)))
    x = sorted(x, key=lambda i: points[i][0])
    y = sorted(y, key=lambda i: points[i][1])
    # Початок побудови дерева з верхньою роздільною лінією по вертикалі
    return _preprocessing(points, x, y, Dim.VERTICAL)

# Рекурсивна функція пошуку точок у заданому прямокутнику
def _range_search(node, x_range, y_range, res):
    # Визначення границь прямокутника по відповідному виміру
    left, right = x_range if node.line_dim == Dim.VERTICAL else y_range
    # Отримання координати роздільної лінії
    m = getM(node)
    # Перевірка, чи перетинається роздільна лінія з прямокутником
    if left <= m <= right:
        # Перевірка, чи точка потрапляє в заданий прямокутник
        if isInsideOfRect(node.point, x_range, y_range):
            # Додавання індексу та координат точки до результату
            res.append([node.point_index, node.point]) 
    # Рекурсивний виклик для лівого піддерева, якщо воно може містити точки у прямокутнику
    if node.left and left < m:
        _range_search(node.left, x_range, y_range, res)
    # Рекурсивний виклик для правого піддерева, якщо воно може містити точки у прямокутнику
    if node.right and m < right:
        _range_search(node.right, x_range, y_range, res)

# Функція пошуку точок у заданому прямокутнику
def rangeSearch(tree, x_range, y_range):
    res = []
    _range_search(tree, x_range, y_range, res)
    return res

# Функція отримання точок з файлу
def getPointFromFile(filename):
    points = []
    with open(filename) as f:
        input_lines = f.readlines()
        for line in input_lines:
            x, y = line.split()
            points.append((float(x), float(y)))
        return points

# Функція отримання координат прямокутника з файлу
def readRegion(filename):
    with open(filename) as f:
        line1 = f.readline()
        x1, x2 = line1.split()
        x = [float(x1), float(x2)]
        line2 = f.readline()
        y1, y2 = line2.split()
        y = [float(y1), float(y2)]
        return x, y

# Функція ініціалізації та відображення графіку
def main():
    points = getPointFromFile("points.txt")
    x_region, y_region = readRegion("regions.txt")

    fig, ax = plt.subplots(2)
    ax[0].set_xlim([0, 9])
    ax[0].set_ylim([0, 9])
    ax[1].set_xlim([0, 9])
    ax[1].set_ylim([0, 9])

    # Додавання прямокутника для першого графіку
    rect = patches.Rectangle((x_region[0], y_region[0]), x_region[1] - x_region[0], y_region[1] - y_region[0], linewidth=1, edgecolor='b',
                             facecolor='none')
    ax[0].add_patch(rect)

    # Додавання точок для першого графіку
    for point in points:
        circle = patches.Circle((point[0], point[1]), radius=0.051, color='b')
        ax[0].add_patch(circle)

    # Додавання прямокутника для другого графіку
    rect2 = patches.Rectangle((x_region[0], y_region[0]), x_region[1] - x_region[0], y_region[1] - y_region[0], linewidth=1, edgecolor='b',
                              facecolor='none')
    ax[1].add_patch(rect2)
    
    # Побудова дерева та пошук точок у заданому прямокутнику
    tree = preprocessing(points)
    result = rangeSearch(tree, x_region, y_region)
    
    # Додавання знайдених точок на другий графік
    for point in result:
        circle = patches.Circle((point[1][0], point[1][1]), radius=0.051, color='b')
        ax[1].add_patch(circle)

    plt.show()


if __name__ == "__main__":
    main()
