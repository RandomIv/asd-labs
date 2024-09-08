#include <stdio.h>
#include <math.h>
int main() {
    int n, counter = 0;
    counter++; //автоматичне присвоєння
    scanf("%d", &n);
    counter++; //присвоєння
    double res = 1 , sum;
    counter += 3; // 2 присвоєння рядком вище та присвоєння i рядком нижче
    for(int i=1; i<=n; i++){
        if(i!=1) counter++; //інкрементація і
        counter++; //порівняння i з n
        sum += sin(i) + 1;
        counter += 3; //присвоєння, синус, додавання
        res *= i * (i + 1) / sum;
        counter += 5; //присвоєння, множення, ділення, додавання, ітерування
    }
    printf("%.7f\n", res);
    printf("%d", counter);
    return 0;
}
