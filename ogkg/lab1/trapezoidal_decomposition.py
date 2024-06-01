import random
import matplotlib.pyplot as plot


MIN_X = 0
MAX_X = 7
MIN_Y = 0
MAX_Y = 7


class Point:
    def __init__(self, x:float=0, y:float=0) -> None:
        self.x = x
        self.y = y
    
    def __str__(self) ->str:
        return f'[{self.x},{self.y}]'
    
    def is_below(self, point:"Point"):
        if point.y <= self.y:
            return True
        return False

    def is_left_from_edge(self,edge: "Edge") -> int:
        edge_vector = Point(edge.end_point.x-edge.start_point.x, edge.end_point.y-edge.start_point.y)
        edge_to_point_vector = Point(self.x-edge.start_point.x,self.y-edge.start_point.y)

        cross_vector = edge_vector.x * edge_to_point_vector.y - edge_vector.y*edge_to_point_vector.x

        if cross_vector > 0:
            return 1 # left
        elif cross_vector < 0:
            return -1 #right
        else:
            return 0
    
    def is_not_right_from_edge(self, edge: "Edge") -> bool:
        is_left_from_edge = self.is_left_from_edge(edge)
        return is_left_from_edge in (1,0)


class Edge:
    def __init__(self, start_point:Point, end_point: Point) -> None:
        self.start_point = start_point
        self.end_point = end_point

        if self.start_point.y > self.end_point.y:
            self.start_point, self.end_point = self.end_point, self.start_point
        
    def __str__(self) -> str:
        return f'{self.start_point} -> {self.end_point}'


class Leaf:
    def __init__(self, left, right, split_edge: Edge) -> None:
        self.left = left
        self.right = right
        self.split_edge = split_edge
    
    def locate(self, point:Point):
        if point.is_not_right_from_edge(self.split_edge):
            self.left.locate(point)
        else:
            self.right.locate(point)
        
    def display(self, tabulation):
        res = "\n" + tabulation  + "[LeftRightNode([" + str(self.split_edge.start_point.x) + "," + str(self.split_edge.start_point.y) + "],[" + str(self.split_edge.end_point.x) + "," + str(self.split_edge.end_point.y)  + "]) -> Left : "
        res += self.left.display(tabulation+'\t')
        res += f"\n{tabulation}, Right : "
        res += self.right.display(tabulation+'\t')
        res += ']'
        return res
    

class Root:
    def __init__(self, lower:Leaf,upper:Leaf, median:float) -> None:
        self.lower_leaf = lower
        self.upper_leaf = upper

        self.median = median

    
    def locate(self, point:Point):
        if point.y > self.median:
            self.upper_leaf.locate(point)
        else:
            self.lower_leaf.locate(point)
        
    def display(self, tabulation):
        res = '\n' + tabulation + '[UpperLowerNode('+ str(self.median)+") -> Upper : "
        res +=self.upper_leaf.display(tabulation+'\t')
        res += f'\n{tabulation}, Lower :'
        res+=self.lower_leaf.display(tabulation+'\t')
        res+=']'
        return res
    

class Tree:
    def __init__(self, root: Root) -> None:
        self.root = root
    
    def locate(self, point: Point):
        self.root.locate(point)
    
    def display(self):
        tabulation = '\t'
        res = 'TREE:\n'
        res+=self.root.display(tabulation)
        print(res)
        plot.show()


class Trapezoid:
    def __init__(self, edges: list[Edge]) -> None:
        self.edges = edges
    
    def locate(self, point:Point):
        print(f'POINT:{point} FOUND IN TRAPEZOID:')
        for edge in self.edges:
            print(edge)
        
    def display(self, tabulation):
        res = '\n' + tabulation+'[Trapezoid -> '
        for edge in self.edges:
            res += "([" + str(edge.start_point.x) + "," + str(edge.start_point.y) + "],[" + str(edge.end_point.x) + "," + str(edge.end_point.y)  + "]) "
        plot_trapezoid(self.edges)
        return res


def get_median(vertices: list[Point]):
    median = (vertices[-1].y+vertices[0].y) / 2.0
    median_point = vertices[0]

    for vertice in vertices[1:]:
        if abs(median_point.y-median) > abs(vertice.y-median):
            median_point = vertice
    
    return Edge(Point(MIN_X,median_point.y), Point(MAX_X, median_point.y))

def get_upper_edge(vertices: list[Point]):
    return Edge(Point(MIN_X,vertices[-1].y), Point(MAX_X, vertices[-1].y))

def get_lower_edge(vertices:list[Point]):
    return Edge(Point(MIN_X, vertices[0].y), Point(MAX_X, vertices[0].y))

def get_right_edge(vertices:list[Point]):
    right_bound = vertices[0]
    for vertice in vertices:
        if vertice.x > right_bound.x:
            right_bound = vertice
    
    return Edge(Point(right_bound.x, MIN_Y), Point(right_bound.x, MAX_Y))

def get_left_edge(vertices:list[Point]):
    left_bound = vertices[0]
    for vertice in vertices:
        if vertice.x < left_bound.x:
            left_bound = vertice
    
    return Edge(Point(left_bound.x, MIN_Y), Point(left_bound.x, MAX_Y))

def decompose_root(edges: list[Edge], vertices: list[Point], lower_edge: Edge, upper_edge: Edge, right_edge: Edge, left_edge: Edge):
    median = get_median(vertices)

    lower_edges = []
    upper_edges = []
    lower_vertices = []
    upper_vertices = []

    for edge in edges:
        if edge.start_point.y < median.start_point.y:
            lower_edges.append(edge)
        if edge.end_point.y > median.start_point.y:
            upper_edges.append(edge)

    for vertice in vertices:
        if vertice.is_below(median.start_point):
            lower_vertices.append(vertice)
        else:
            upper_vertices.append(vertice)
    
    return Root(decompose_leaves(lower_edges, lower_vertices, lower_edge, median, right_edge, left_edge), decompose_leaves(upper_edges, upper_vertices, median, upper_edge, right_edge, left_edge), median.start_point.y)

def decompose_leaves(edges: list[Edge], vertices: list[Point], lower_edge: Edge,upper_edge: Edge, right_edge:Edge, left_edge: Edge):
    split_edge = None

    inner_point = False

    for edge in edges:
        if edge.start_point.y <= lower_edge.start_point.y and edge.end_point.y >= upper_edge.start_point.y:
            split_edge = edge
            break
        
        if (edge.start_point.is_not_right_from_edge(right_edge) and not edge.start_point.is_not_right_from_edge(left_edge) and edge.start_point.y != upper_edge.start_point.y and edge.start_point.y != lower_edge.start_point.y) or (edge.end_point.is_not_right_from_edge(right_edge) and not edge.end_point.is_not_right_from_edge(left_edge) and edge.end_point.y != upper_edge.start_point.y and edge.end_point.y != lower_edge.start_point.y):
            inner_point = True
    
    if not split_edge:
        if not inner_point:
            return Trapezoid([lower_edge, left_edge, upper_edge, right_edge])
        return decompose_root(edges, vertices, lower_edge,upper_edge,right_edge,left_edge)

    right_edges = []
    right_vertices = []
    left_edges = []
    left_vertices = []


    for edge in edges:

        if edge==split_edge:
            continue

        start_check = edge.start_point.is_left_from_edge(split_edge)
        end_check = edge.end_point.is_left_from_edge(split_edge)
        
        if start_check == 1:
            if edge not in left_edges:
                left_edges.append(edge)
            if edge.start_point.y >= lower_edge.start_point.y and edge.start_point.y <= upper_edge.start_point.y and edge.start_point not in left_vertices:
                left_vertices.append(edge.start_point)
        elif start_check == -1:
            if edge not in right_edges:
                right_edges.append(edge)
            if edge.start_point.y >= lower_edge.start_point.y and edge.start_point.y <= upper_edge.start_point.y and edge.start_point not in right_vertices:
                right_vertices.append(edge.start_point)
        

        if end_check == 1:
            if edge not in left_edges:
                left_edges.append(edge)
            
            if edge.end_point.y >= lower_edge.start_point.y and edge.end_point.y <=upper_edge.start_point.y and edge.end_point not in left_vertices:
                left_vertices.append(edge.end_point)
        
        elif end_check == -1:
            if edge not in right_edges:
                right_edges.append(edge)
            if edge.end_point.y >= lower_edge.start_point.y and edge.end_point.y <=upper_edge.start_point.y and edge.end_point not in right_vertices:
                right_vertices.append(edge.end_point)

    return Leaf(left=decompose_leaves(left_edges,left_vertices,lower_edge,upper_edge,split_edge,left_edge), right=decompose_leaves(right_edges, right_vertices, lower_edge,upper_edge,right_edge,split_edge), split_edge=split_edge)

def merge_sort(vertices:list[Point]):
    if len(vertices) > 1:
        mid_element_index = len(vertices) // 2

        left_half = vertices[:mid_element_index]
        right_half = vertices[mid_element_index:]

        merge_sort(left_half)
        merge_sort(right_half)

        i = j = k = 0

        while i < len(left_half) and j < len(right_half):
            if left_half[i].y < right_half[j].y:
                vertices[k] = left_half[i]
                i += 1
            else:
                vertices[k] = right_half[j]
                j += 1
            k += 1

        while i < len(left_half):
            vertices[k] = left_half[i]
            i += 1
            k += 1

        while j < len(right_half):
            vertices[k] = right_half[j]
            j += 1
            k += 1

def sort_vertices(vertices: list[Point]):
    for i in range(1, len(vertices)):
        vertice = vertices[i]
        j = i-1
        while j>=0 and vertices[j].y > vertice.y:
            vertices[j+1] = vertices[j]
            j-=1
        vertices[j+1] = vertice

def plot_plane(edges: list[Edge], points:list[Point]):
    for edge in edges:
        plot.plot([edge.start_point.x, edge.end_point.x],[edge.start_point.y,edge.end_point.y], 'b-')
    
    for point in points:
        plot.scatter(point.x, point.y, color='red', label='Point')
    
    plot.gca().set_aspect('equal',adjustable='box')

    plot.xlabel('X')
    plot.ylabel('Y')
    plot.title('Polygon')
    plot.grid(True)
    plot.xlim(MIN_X-1, MAX_X)
    plot.ylim(MIN_Y-1, MAX_Y)

def plot_trapezoid(edges: list[Edge]):
    plot.gca().set_aspect('equal',adjustable='box')
    plot.xlabel('X')
    plot.ylabel('Y')
    plot.title('Polygon')

    plot.xlim(MIN_X-1, MAX_X)
    plot.ylim(MIN_Y-1,MAX_Y)
    plot.grid(True)

    for edge in edges:
        plot.plot([edge.start_point.x,edge.end_point.x],[edge.start_point.y,edge.end_point.y], linestyle='-')


# ray-casting algorithm
def is_point_inside_polygon(point:Point, edges: list[Edge]):
    count = 0
    for edge in edges:
        if ((edge.start_point.y > point.y) != (edge.end_point.y > point.y)) and \
                (point.x < (edge.end_point.x - edge.start_point.x) * (point.y - edge.start_point.y) / (edge.end_point.y - edge.start_point.y) + edge.start_point.x):
            count+=1
    return count % 2 == 1
        
        
if __name__ == '__main__':
    vertices = [
        Point(0, 1.5),
        Point(1, 3.5),
        Point(3.5, 4),
        Point(5, 2),
        Point(2.5, 0)
        ]
    
    edges = [
        Edge(vertices[0],vertices[1]),
        Edge(vertices[1], vertices[2]),
        Edge(vertices[2], vertices[3]),
        Edge(vertices[3], vertices[4]),
        Edge(vertices[4], vertices[0])
        ]

    points = []
    for i in range(5):
        point = Point(random.uniform(MIN_X, MAX_X), random.uniform(MIN_Y,MAX_Y))  # Point to test
        points.append(point)
    
    points.append(Point(0, 1.5))
    points.append(Point(1,5))
    points.append(Point(1,2))
    points.append(Point(2,2))
    plot_plane(edges, points)
    merge_sort(vertices)
    tree = Tree(decompose_root(edges, vertices, get_lower_edge(vertices), get_upper_edge(vertices), get_right_edge(vertices), get_left_edge(vertices)))
    for point in points:
        if not is_point_inside_polygon(point, edges):
            print(f'Point {point} is outside of polygon')
        else:
            tree.locate(point)
    tree.display()
    