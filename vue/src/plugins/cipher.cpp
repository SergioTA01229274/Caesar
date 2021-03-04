#include <iostream>
#include <stdio.h>
#include <string.h>

extern "C"{
    char* testFunc(char* str){
        return strcat((char*)"This is the string you entered: ", str);
    }
}
