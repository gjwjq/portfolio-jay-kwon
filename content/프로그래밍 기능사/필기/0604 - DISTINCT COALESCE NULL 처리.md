---
title: "0604 - DISTINCT / COALESCE / NULL 처리"
---

이 페이지는 **SELECT에서 자주 나오는 함수/키워드**만 정리.

## DISTINCT

발음: **디스팅트**

뜻:

```
중복 제거
```

예시:

```
SELECTDISTINCT grade
FROM student;
```

뜻:

```
grade 값을 중복 없이 출력
```

예시 데이터:

grade

---

1

---

1

---

2

---

3

---

3

---

결과:

grade

---

1

---

2

---

3

---

## COALESCE

발음: **코얼레스**

뜻:

```
NULL이 아닌 첫 번째 값 반환
```

예시:

```
SELECT COALESCE(tlno,'NONE')AS tlno
FROM patient;
```

뜻:

```
tlno가 NULL이면 NONE 출력
tlno가 NULL이 아니면 원래 tlno 출력
```

여러 개도 가능:

```
SELECT COALESCE(phone, email,'연락처 없음')AS contact
FROM member;
```

뜻:

```
phone 있으면 phone
phone 없으면 email
둘 다 없으면 연락처 없음
```

암기:

```
COALESCE = NULL이면 다음 값으로 넘어감
```