#include <stdio.h>

int main() {
    int row, column;
    printf("Amount of Rows:");
    scanf("%d", &row) ;
    printf("Amount of columns:");
    scanf("%d", &column) ;
    int A[row][column];
    for (int i = 0; i < row; i++) {
        for (int j = 0; j < column; j++) {
            scanf("%d", &A[i][j]);
        }
    }
    for (int i = 0; i < column; i++) {
        int max = 0, r = 0, c = 0;
        for (int j = 0; j < row; j++) {
            if(A[j][i] >= max){
                max=A[j][i];
                r = j;
                c = i;
            }
        }
        printf("%d %d %d\n", max, r, c);
    }
}
