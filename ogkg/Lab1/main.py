import trapezoid_decomposition as td


# Приклад #1

vertices_coords = [(2, 4), (4, 3), (3, 1), (3, 6), (6, 5)]
edges_list = [(0, 2), (0, 3), (1, 2), (1, 3), (1, 4), (3, 4)]
point = (3, 2)


# Приклад #2

# vertices_coords = [(10, 15), (5, 15), (12, 8), (6, 7), (1, 2), (5, 0)]
# edges_list = [(0, 1), (1, 2), (2, 3), (1, 4), (3, 4), (2, 5), (3, 5), (0, 2)]
# point = (1, 5)


if __name__ == '__main__':
    graph, tree = td.preprocessing(vertices_coords, edges_list)
    loc = td.point_localization(graph, tree, point, visualize=True)
    td.visualize_tree(tree)
    print(*loc, sep="\n")
    input()
