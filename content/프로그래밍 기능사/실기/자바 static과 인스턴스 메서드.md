`static` 메서드는 클래스에 붙어있는 메서드고, 인스턴스 메서드는 객체에 붙어있는 메서드다. 
오버라이딩 오류 문제를 풀다가 둘의 차이를 정확히 몰라서 헷갈렸고, 확실하게 알기 위해서 글 작성.

클래스는 붕어빵 틀, 객체(인스턴스)는 틀로 찍어낸 붕어빵이라고 생각하면 된다. 인스턴스 메서드는 붕어빵마다 가진 기능이라 붕어빵을 먼저 만들어야(`new`) 쓸 수 있고, static 메서드는 틀 자체에 붙은 기능이라 붕어빵 없이 바로 쓸 수 있다.

**예시 코드**

java

```java
class Student {
    String name;

    void hello() {                  // 인스턴스 메서드
        System.out.println("저는 " + name + "입니다");
    }

    static int add(int a, int b) {  // static 메서드
        return a + b;
    }
}

Student.add(1, 2);           // static: 클래스 이름으로 바로 호출

Student s = new Student();   // 인스턴스: 객체를 먼저 만들어야 함
s.name = "제이";
s.hello();
```

- `static` 메서드 : `클래스명.메서드()`로 호출, 객체 생성 필요 없음
- 인스턴스 메서드 : `객체.메서드()`로 호출, `new`로 객체를 만들어야 함
- static 메서드 안에서는 인스턴스 변수(`name`)나 `this`를 쓸 수 없음 → 객체가 없을 수도 있으니까

## static 메서드는 오버라이딩이 안 된다

static 메서드는 객체가 아니라 클래스에 속해서 오버라이딩이 되지 않는다. 자식 클래스에서 static으로 다시 선언하는 건 가능한데, 이건 오버라이딩이 아니라 **하이딩**이다.

java

```java
class Util {
    static int twice(int x) {
        return x * 2;
    }
}

class MyUtil extends Util {
    int twice(int x) {      // ❌ 컴파일 오류
        return x * 3;
    }
}
```

- 부모의 static 메서드를 자식에서 static 없이 인스턴스 메서드로 선언 → 오류
- 자식에서도 `static int twice(int x)`로 선언 → 가능 (하이딩)
- 반대로 부모의 인스턴스 메서드를 자식에서 static으로 선언해도 오류
- `@Override`를 붙여도 오류

java

```java
Parent p = new Child();
p.show();   // static이면 Parent의 show() 실행
```

- 오버라이딩(인스턴스 메서드) : 실제 객체 타입(Child) 기준으로 실행
- 하이딩(static 메서드) : 참조 변수 타입(Parent) 기준으로 실행

**답안 쓸 때**

> 부모 클래스의 static 메서드를 자식 클래스에서 static 없이 인스턴스 메서드로 선언했기 때문에 오류가 발생한다. (static 메서드는 오버라이딩할 수 없다.)

"재선언 불가"라고만 쓰면 static 재선언도 안 된다는 뜻으로 읽힐 수 있으니 주의.