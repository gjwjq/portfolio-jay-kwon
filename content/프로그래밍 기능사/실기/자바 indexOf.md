`indexOf`는 문자열에서 해당 문자가 몇번 인덱스에 쓰여있는지 찾아주는 메서드다.
반대로 뒤에서 부터 몇번 인덱스에 있는지 찾아주는 `lastIndexOf` 라는 메서드도 존재하는데
서로 어떻게 다른지는 예시 코드를 통해 설명하겠다.

```java
String s = "apple an apple";

System.out.println(s.indexOf("apple"));      // 0
System.out.println(s.lastIndexOf("apple"));  // 9
```

