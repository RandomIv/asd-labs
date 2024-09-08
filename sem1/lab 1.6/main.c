#include <stdio.h>
#include <windows.h>
const int MAX_X = 80;
const int MAX_Y = 24;
void jumpto(int x, int y) {
    COORD Pos;
    Pos.X = x;
    Pos.Y = y;
    HANDLE hout = GetStdHandle(STD_OUTPUT_HANDLE);
    SetConsoleCursorPosition(hout, Pos);
    printf("#");
    Sleep(2);
}
int main() {
    for(int i = 0; i < MAX_X/2; i++){
        for (int j = 0; j < MAX_Y; j++) {
            if(i%2==0){
                jumpto(i, MAX_Y-j-1);
                jumpto(MAX_X-i-1, MAX_Y-j-1);
            }
            else{
                jumpto(i, j);
                jumpto(MAX_X-i-1, j);
            }
        }
    }
    getchar();
}
