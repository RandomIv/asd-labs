#include <stdio.h>
#include <stdbool.h>
#include <math.h>
int main() {
    int n;
    printf("Order of Matrix:");
    scanf("%d", &n);    int a[n][n];
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            scanf("%d", &a[i][j]);
        }
    }
    bool f=true;
    int t;
    while (f==true)
    {
        f=false;
        for (int i=0; i<n-1; i++)
        {
            if (a[n-1-i][i]<a[n-1-i-1][i+1])
            {
                t=a[n-1-i][i];
                a[n-1-i][i]=a[n-1-i-1][i+1];
                a[n-1-i-1][i+1]=t;
                f=true;
            }
        }
    }
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            printf("%d ", a[i][j]);
        }
        printf("\n");
    }
    return 0;
}
