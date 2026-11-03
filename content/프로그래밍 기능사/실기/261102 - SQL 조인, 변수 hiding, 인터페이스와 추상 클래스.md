## 한눈에 보기

|개념|한 줄 요약|
|---|---|
|INNER JOIN|양쪽 다 일치하는 행만 (교집합)|
|RIGHT OUTER JOIN|오른쪽 전부 + 왼쪽 일치분, 짝 없으면 NULL|
|변수 오버라이딩|안 됨 → 숨김(hiding). 변수는 참조 타입 기준, 메서드는 실제 객체 기준|
|인터페이스 vs 추상 클래스|인터페이스: 다중 구현 O, 상수만, 생성자 X / 추상 클래스: 단일 상속, 변수 자유, 생성자 O|

---

## INNER JOIN / RIGHT OUTER JOIN

INNER는 겹치는 것만, RIGHT는 오른쪽 테이블을 다 살림. `INNER`, `OUTER`는 생략 가능.

sql

```sql
SELECT 학생.이름, 반.반이름
FROM 학생
RIGHT JOIN 반 ON 학생.반번호 = 반.반번호;
```

- 반 테이블(오른쪽)의 모든 행이 나옴
- 학생 없는 3반 → `NULL | 3반`
- `INNER JOIN`이었으면 3반 행은 아예 빠짐

---

## 변수는 오버라이딩 안 됨 (hiding)

자식에 같은 이름 변수 선언하면 부모 걸 가릴 뿐. 명찰(참조 타입)대로 보임.

java

```java
Parent p = new Child();
System.out.println(p.name); // 부모
p.show();                   // 자식 메서드
```

- `p.name` → 참조 타입 `Parent` 기준 → 부모 값
- `p.show()` → 실제 객체 `Child` 기준 → 오버라이딩됨
- 자식 안에서 부모 변수: `super.name`

---

## 인터페이스 vs 추상 클래스

둘 다 `new`로 객체 생성 불가.

java

```java
interface A { int X = 10; void run(); }          // public static final / public abstract 자동
abstract class B { int y; B() {} abstract void go(); void stop() {} }
```

- 인터페이스: `implements` 여러 개 가능, 변수는 자동 `public static final`(상수), 생성자 없음
- 추상 클래스: `extends` 하나만, 일반 변수·일반 메서드 가능, 생성자 있음(자식이 `super()`로 호출)