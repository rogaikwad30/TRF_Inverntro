#include<bits\stdc++.h>
using namespace std;

/* 
     Basic ----> Class Type  i.e... Through Constructor overloading 
     Class ----> Inbuilt Conversion i.e... CONVERSION  OR CASTING  FUNCTION
         Rules : Must be member function with NO input parameters and return TYPE
         Syntax  : 
                     Class_Type : :  operator   Inbuilt_type   (  ) {
                         .............................
                     }

            E.g.  :   Complex ::  operator int ( ){
                         ............................   Takes Complex and converts it to int 
                     }
*/ 

class C {
    int img , real;
    public:
    C (){
        img = real = 0; 
    }
    C (int a, int b){
        real = a ;
        img = b ;
    }
    operator  int () {
        return real+img;
    }
};

int main(){
    C  obj(5,4);
    int a = obj;
    cout<<a;
    cout<<cbrt(2121);
}