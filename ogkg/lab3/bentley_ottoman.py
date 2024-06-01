import matplotlib.pyplot as plot
import random


MIN_X = 0
MAX_X = 7
MIN_Y = 0
MAX_Y = 7


class Point:
    def __init__(self, x: float,y:float,name:str):
        self.x = x
        self.y = y

        self.name = name

    def __str__(self):
        return f'{self.name} : ({self.x},{self.y})'
    
    def __eq__(self, point: "Point"):
        return (self.x == point.x and self.y == point.y) or self.name == point.name
    

class SegmentPoint:
    def __init__(self, point: Point, segments):
        self.point = point
        self.segments = segments

        if len(segments) == 1:
            self.name = point.name
        elif len(segments) == 2:
            if segments[0].id > segments[1].id:
                segments[0],segments[1] = segments[1],segments[0]
            self.name = f'{segments[0].id}x{segments[1].id}'
        else:
            self.name = 'null'

    def __str__(self):
        segments_str = ""
        for segment in self.segments:
            segments_str += str(segment)
        return f'{self.name} : Segments {segments_str}\nPoint {self.point}'
    
    def __eq__(self, other):
        return (self.point == other.point) or (self.name == other.name)

class Segment:
    def __init__(self, start: Point, end:Point, id:int):
        self.start = start
        self.end = end

        if self.start.y < self.end.y:
            self.start , self.end = self.end,self.start
            self.start.name, self.end.name = self.end.name, self.start.name
        self.id = id

    def __str__(self):
        return f'(Segment {self.id} : {self.start} -> {self.end})'
    
    def __eq__(self, other):
        return self.id == other.id
    

def quicksort(points:list[Point]):
    def compare(point1: Point,point2:Point):
        if point1.y > point2.y or (point1.y == point2.y and point1.x < point2.x):
            return -1
        elif point1.y < point2.y or (point1.y == point2.y and point1.x>point2.x):
            return 1
        else:
            return 0
        

    def partition(array,low,high):
        pivot = array[high]
        i = low - 1 
        for j in range(low,high):
            if compare(array[j].point,pivot.point) == -1:
                i+=1
                array[i],array[j] = array[j],array[i]
        
        array[i+1], array[high] = array[high], array[i+1]
        return i+1
    
    def quicksort_helper(array,low,high):
        if low < high:
            pi = partition(array,low,high)
            quicksort_helper(array,low,pi-1)
            quicksort_helper(array,pi+1,high)

    quicksort_helper(points,0,len(points)-1)


def find_intersect(segment1: Segment,segment2:Segment):
    x1,y1,x2,y2,x3,y3,x4,y4 = segment1.start.x, segment1.start.y , segment1.end.x, segment1.end.y, segment2.start.x,segment2.start.y,segment2.end.x,segment2.end.y

    slope1 = (y2-y1) / (x2-x1) if x2-x1!=0 else float('inf')
    slope2 = (y4-y3) / (x4-x3) if x4-x3!=0 else float('inf')

    if slope1 == slope2:
        return None
    if slope1 == float('inf'):
        x = x1
        y = slope1 * (x-x1) + y1
    else:
        x = ((slope1*x1-y1)-(slope2*x3-y3)) / (slope1-slope2)
        y = slope1 * (x-x1) + y1
    
    if (min(x1,x2) <=x <=max(x1,x2)) and (min(x3,x4)<=x<=max(x3,x4)) and (min(y1,y2) <=y<=max(y1,y2)) and (min(y3,y4)<=y<=max(y3,y4)):
        a = min(segment1.id,segment2.id)
        b = max(segment1.id,segment2.id)

        return Point(x,y,f"{a}x{b}")
    else:
        return None

def sortinsert(segment1,segment2, intersections, event_queue, event):
    intersection = find_intersect(segment1,segment2)
    if intersection:
        if intersection not in intersections:
            intersections.append(intersection)

            segment_point = SegmentPoint(intersection, [segment1,segment2])

            if segment_point not in event_queue and segment_point!=event:
                if len(event_queue) == 0:
                    event_queue.append(segment_point)
                elif segment_point.point.y >= event_queue[0].point.y:
                    event_queue.insert(0,segment_point)
                else:
                    for i in range(len(event_queue)):
                        if i==0:
                            if event_queue[i].point.y <=segment_point.point.y:
                                event_queue.insert(i,segment_point)
                                break
                        elif event_queue[i-1].point.y >= segment_point.point.y and event_queue[i].point.y <= segment_point.point.y:
                            event_queue.insert(i, segment_point)
                            break
                        elif i == len(event_queue)-1:
                            event_queue.append(segP)