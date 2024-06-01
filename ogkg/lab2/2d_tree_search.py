import matplotlib.pyplot as plt
import random
import math
from typing import List

MIN_X = 0
MAX_X = 7
MIN_Y = 0
MAX_Y = 7
      

class Point:
    def __init__(self, x: float, y: float) -> None:
        self.x = x
        self.y = y
        
    def __str__(self)->str:
        return f"[{self.x},{self.y}]"
        

class Edge:
    def __init__(self, start_point: Point, end_point: Point) -> None:
        self.start_point = start_point
        self.end_point = end_point
        if self.start_point.y > self.end_point.y:
            self.start_point, self.end_point = self.end_point, self.start_point
    
    def __str__(self) -> str:
        return f'\n{self.start_point} -> {self.end_point}'
        
        
class UDNode:
    def __init__(self, point: Point, med: Edge, upper, down):
        self.point = point
        self.med = med
        self.upper = upper
        self.down = down
    
    def display(self, tabulation):
        plt.plot([self.med.start_point.x, self.med.end_point.x], [self.med.start_point.y, self.med.end_point.y], 'b-')
        res = "\n" + tabulation + "[UpDownNode(" + str(self.point.x) + "," + str(self.point.y) + ") -> Up : "
        res += self.upper.display(tabulation + "\t")
        res += " , Down : "
        res += self.down.display(tabulation + "\t")
        res += "]"
        return res
    
    def search(self, upper_bound: float, lower_bound: float, left_bound: float, right_bound: float, res: List[Point]):
        if self.point.x >= left_bound and self.point.x <= right_bound and self.point.y >= lower_bound and self.point.y <= upper_bound:
            res.append(self.point)
        if self.point.y >= lower_bound:
            self.down.search(upper_bound=upper_bound, lower_bound=lower_bound, left_bound=left_bound, right_bound=right_bound, res=res)
        if self.point.y <= upper_bound:
            self.upper.search(upper_bound=upper_bound, lower_bound=lower_bound, left_bound=left_bound, right_bound=right_bound, res=res)
    
        
class LRNode:
    def __init__(self, point: Point, med: Edge, left, right) -> None:
        self.point = point
        self.med = med
        self.left = left
        self.right = right
    
    def display(self, tabulation):
        plt.plot([self.med.start_point.x, self.med.end_point.x], [self.med.start_point.y, self.med.end_point.y], 'b-')
        res = "\n" + tabulation  + "[LeftRightNode(" + str(self.point.x) + "," + str(self.point.y) + ") -> Left : "
        res += self.left.display(tabulation + "\t")
        res += " , Right : "
        res += self.right.display(tabulation + "\t")
        res += "]"
        return res
    
    def search(self, upper_bound: float, lower_bound: float, left_bound: float, right_bound: float, res: List[Point]):
        if self.point.x >= left_bound and self.point.x <= right_bound and self.point.y >= lower_bound and self.point.y <= upper_bound:
            res.append(self.point)
        if self.point.x >= left_bound:
            self.left.search(upper_bound=upper_bound, lower_bound=lower_bound, left_bound=left_bound, right_bound=right_bound, res=res)
        if self.point.x <= right_bound:
            self.right.search(upper_bound=upper_bound, lower_bound=lower_bound, left_bound=left_bound, right_bound=right_bound, res=res)
        

class Leaf:
    def __init__(self) -> None:
        pass
    def display(self):
        return "Leaf reached"
    def search(upper_bound: float, lower_bound: float, left_bound: float, right_bound: float, res: List[Point]):
        return
        
        
def partitionY(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j].y <= pivot.y:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

def partitionX(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j].x <= pivot.x:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

def quickselect(arr, low, high, k, partition_func):
    if low <= high:
        pivot_index = partition_func(arr, low, high)
        if pivot_index == k:
            return arr[k]
        elif pivot_index < k:
            return quickselect(arr, pivot_index + 1, high, k, partition_func)
        else:
            return quickselect(arr, low, pivot_index - 1, k, partition_func)

def find_median(arr, partition_func):
    n = len(arr)
    median_index = n // 2
    median_point = quickselect(arr, 0, n - 1, median_index, partition_func)
    print(f'Chosen median:{median_point}')
    return median_point


def generate_points(num_of_points: int) -> List[Point]:
    points = []
    for _ in range(num_of_points):
        points.append(Point(random.uniform(MIN_X, MAX_X), random.uniform(MIN_Y,MAX_Y)))
    return points

def plot_points(points: List[Point]):
    for point in points:
        plt.scatter(point.x, point.y, color="red", label="Point")
    plt.gca().set_aspect('equal', adjustable='box')
    plt.xlabel('X')
    plt.ylabel('Y')
    plt.title('Polygon')
    plt.grid(True)
    plt.xlim(MIN_X-1, MAX_X+1)
    plt.ylim(MIN_Y-1, MAX_Y+1)
    
    
def make_lr_node(points: List[Point], left_bound: float, right_bound: float, lower_bound: float, upper_bound: float):
    if len(points) == 0:
        return Leaf
    median_point = find_median(points, partitionX)
    med = Edge(Point(median_point.x, lower_bound), Point(median_point.x, upper_bound))
    l_points = []
    r_points = []
    for point in points:
        if point.x < median_point.x:
            l_points.append(point)
        elif point.x > median_point.x:
            r_points.append(point)
        else:
            continue
    return LRNode(med=med, point=median_point,
                  left=make_ud_node(l_points, left_bound=left_bound, right_bound=med.start_point.x, lower_bound=lower_bound, upper_bound=upper_bound),
                  right=make_ud_node(r_points, left_bound=med.start_point.x, right_bound=right_bound, lower_bound=lower_bound, upper_bound=upper_bound))
    
def make_ud_node(points: List[Point], left_bound: float, right_bound: float, lower_bound: float, upper_bound: float):
    if len(points) == 0:
        return Leaf
    median_point = find_median(points, partitionY)
    med = Edge(Point(left_bound, median_point.y), Point(right_bound, median_point.y))
    u_points = []
    d_points = []
    for point in points:
        if point.y < median_point.y:
            d_points.append(point)
        elif point.y > median_point.y:
            u_points.append(point)
        else:
            continue
    return UDNode(med=med, point = median_point,
                    upper=make_lr_node(u_points, lower_bound=med.start_point.y, upper_bound=upper_bound, left_bound=left_bound, right_bound=right_bound),
                    down=make_lr_node(d_points, lower_bound=lower_bound, upper_bound=med.start_point.y, right_bound=right_bound, left_bound=left_bound))
    
def search_region(tree: LRNode, right, left, up, down):
    plt.plot([right, left], [up, up], "r-")
    plt.plot([right, right], [up, down], "r-")
    plt.plot([right, left], [down, down], "r-")
    plt.plot([left, left], [down, up], "r-")
    res = []
    tree.search(upper_bound=up, lower_bound=down, left_bound=left, right_bound=right, res=res)
    print("Points found after search: ")
    for p in res:
        plt.scatter(p.x, p.y, color="green", label="Found Point")
        print(p)
    
if __name__ == '__main__':
    points = generate_points(20)
    plot_points(points)
    tree = make_lr_node(points, left_bound=MIN_X, right_bound=MAX_X, lower_bound=MIN_Y, upper_bound=MAX_Y)
    print(tree.display("\t"))
    right_x = 0
    left_x = 0
    up_y = 0
    down_y = 0
    search_region(tree=tree, right=right_x, left=left_x, up=up_y, down=down_y)
    plt.show()