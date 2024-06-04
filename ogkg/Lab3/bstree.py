class Node:
    def __init__(self, value, left=None, right=None, parent=None):
        self.value = value  # Значення, що зберігається у вузлі
        self.left = left    # Посилання на лівого дочірнього вузла
        self.right = right  # Посилання на правого дочірнього вузла
        self.parent = parent  # Посилання на батьківський вузол

    def is_leaf(self):
        #Перевіряє, чи є вузол листком.
        return self.left is None and self.right is None

class BSTree:
    def __init__(self):
        self.root = None  # Ініціалізуємо порожнє бінарне дерево пошуку

    def insert(self, value, key):
        #Вставляє новий вузол у бінарне дерево пошуку.
        to_insert = Node(value)  # Створюємо новий вузол з заданим значенням
        current = self.root  # Починаємо обхід з кореня
        pos_to_insert = None  # Ініціалізуємо позицію для вставки нового вузла

        while current is not None:
            pos_to_insert = current  # Оновлюємо позицію для вставки

            # Визначаємо, в який бік рухатися залежно від ключової функції
            if key(value) < key(current.value):
                current = current.left
            else:
                current = current.right

        # Встановлюємо батьківський вузол для нового вузла
        to_insert.parent = pos_to_insert

        # Вставляємо новий вузол у потрібне місце
        if pos_to_insert is None:
            self.root = to_insert  # Якщо дерево порожнє, встановлюємо новий вузол як корінь
        elif key(value) < key(pos_to_insert.value):
            pos_to_insert.left = to_insert  # Вставляємо як лівого дочірнього вузла
        else:
            pos_to_insert.right = to_insert  # Вставляємо як правого дочірнього вузла

        return to_insert

    def remove(self, node):
        #Видаляє вузол з бінарного дерева пошуку.
        if node is None:
            return

        # Випадок 1: Вузол не має лівого дочірнього
        if node.left is None:
            self.__transplant(node, node.right)
        # Випадок 2: Вузол не має правого дочірнього
        elif node.right is None:
            self.__transplant(node, node.left)
        # Випадок 3: Вузол має обидва дочірні вузли
        else:
            y = self.__leftmost(node.right)

            # Якщо наступник не є правим дочірнім вузлом вузла, який видаляється
            if y.parent != node:
                self.__transplant(y, y.right)
                y.right = node.right
                y.right.parent = y

            self.__transplant(node, y)
            y.left = node.left
            y.left.parent = y

    def __transplant(self, first, second):
        # Замінює піддерево, що має корінь 'first', піддеревом з коренем 'second'.
        if first.parent is None:
            # Якщо 'first' - корінь дерева, замінюємо корінь дерева на 'second'.
            self.root = second
        elif first == first.parent.left:
            # Якщо 'first' - лівий нащадок свого батька, замінюємо лівого нащадка батька на 'second'.
            first.parent.left = second
        else:
            # В іншому випадку замінюємо правого нащадка батька на 'second'.
            first.parent.right = second

        if second is not None:
            # Якщо 'second' не є пустим, встановлюємо його батька на батька 'first'.
            second.parent = first.parent

    def __leftmost(self, node):
        # Знаходить найлівіший вузол у піддереві з коренем у 'node'.
        current = node

        while current.left is not None and not current.is_leaf():
            # Продовжуємо переходити ліворуч у вузлах, доки не досягнемо крайнього лівого вузла.
            current = current.left

        return current

    def successor(self, node):
        # Знаходить наступника даного вузла.
        if node.right is not None:
            # Якщо правий нащадок існує, то наступником буде мінімальний вузол у правому піддереві.
            return self.__minimum(node.right)

        current = node.parent

        while current is not None and node == current.right:
            # Продовжуємо підніматися вгору по дереву до тих пір, поки не знайдемо батька, для якого вузол node є лівим нащадком.
            node = current
            current = current.parent

        return current

    def __minimum(self, node):
        # Знаходить вузол з мінімальним значенням у піддереві з коренем у 'node'.
        current = node

        while current.left is not None:
            # Продовжуємо переходити ліворуч у вузлах, доки не досягнемо крайнього лівого вузла.
            current = current.left
        return current

    def predecessor(self, node):
        # Знаходить попередника даного вузла.
        if node.left is not None:
            # Якщо лівий нащадок існує, то попередником буде максимальний вузол у лівому піддереві.
            return self.__maximum(node.left)

        current = node.parent

        while current is not None and node == current.left:
            # Продовжуємо підніматися вгору по дереву до тих пір, поки не знайдемо батька, для якого вузол node є правим нащадком.
            node = current
            current = current.parent
        return current

    def __maximum(self, node):
        # Знаходить вузол з максимальним значенням у піддереві з коренем у 'node'.
        current = node
        while current.right is not None:
            # Продовжуємо переходити праворуч у вузлах, доки не досягнемо крайнього правого вузла.
            current = current.right
        return current

