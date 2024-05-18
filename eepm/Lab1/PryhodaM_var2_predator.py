import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import solve_ivp

# Визначення системи диференціальних рівнянь
def predator_prey(t, y):
    x, y = y
    dxdt = 4*x - 2*x*y # Рівняння для зміни чисельності жертв
    dydt = 5*x*y - 3*y # Рівняння для зміни чисельності хижаків
    return [dxdt, dydt]

# Параметри для розв'язання рівнянь
t_span = [0, 10]  # Інтервал часу
y0_1 = [10, 5]  # Початкові умови: x0 > y0
y0_2 = [5, 10]  # Початкові умови: x0 < y0

# Розв'язання системи для двох варіантів початкових умов
sol_1 = solve_ivp(predator_prey, t_span, y0_1, t_eval=np.linspace(0, 10, 100))
sol_2 = solve_ivp(predator_prey, t_span, y0_2, t_eval=np.linspace(0, 10, 100))

# Графіки динаміки популяцій
plt.figure(figsize=(10, 5))
plt.plot(sol_1.t, sol_1.y[0], label='Жертви (x0 > y0)')
plt.plot(sol_1.t, sol_1.y[1], label='Хижаки (x0 > y0)')
plt.xlabel('Час')
plt.ylabel('Чисельність')
plt.title('Динаміка популяцій (x0 > y0)')
plt.legend()
plt.grid(True)
plt.show()

plt.figure(figsize=(10, 5))
plt.plot(sol_2.t, sol_2.y[0], label='Жертви (x0 < y0)')
plt.plot(sol_2.t, sol_2.y[1], label='Хижаки (x0 < y0)')
plt.xlabel('Час')
plt.ylabel('Чисельність')
plt.title('Динаміка популяцій (x0 < y0)')
plt.legend()
plt.grid(True)
plt.show()

# 3D графік
from mpl_toolkits.mplot3d import Axes3D  # Імпорт необхідного класу для тривимірного графіку

fig = plt.figure(figsize=(10, 7)) # Створення нової фігури для графіку з розмірами 10x7 дюймів
ax = fig.add_subplot(111, projection='3d') # Додавання підграфіка з тривимірними координатами до фігури
ax.plot(sol_1.y[0], sol_1.y[1], sol_1.t, label='x0 > y0')# Побудова лінійного графіку в тривимірному просторі для першого варіанту початкових умов
ax.plot(sol_2.y[0], sol_2.y[1], sol_2.t, label='x0 < y0') # Побудова лінійного графіку в тривимірному просторі для другого варіанту початкових умов

# Встановлення підписів осей x, y і z відповідно
ax.set_xlabel('Жертви')
ax.set_ylabel('Хижаки')
ax.set_zlabel('Час')

ax.set_title('3D графік динаміки популяцій') # Встановлення заголовка графіку
ax.legend() # Відображення легенди, яка пояснює кожну лінію графіку
plt.show() # Відображення графіку
