# заданное число (от 1 до 20)
target = int(input("Задайте число (1-20):"))

# получаем 5 чисел по порядку и сразу проверяем
for i in range(1, 6):
    n = int(input(f"Ввидите число №{i}:"))
    
    if n == target:
        print("Верно")
        break
    else:
        print("Число не подошло")
