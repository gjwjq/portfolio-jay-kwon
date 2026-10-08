---
title: "0604 - DML / SELECT / INSERT / UPDATE / DELETE"
---

이 페이지는 **데이터 조회, 추가, 수정, 삭제**만 정리.

## SELECT

```
SELECT name, age
FROM student;
```

뜻:

```
student 테이블에서 name, age 조회
```

## INSERT

```
INSERTINTO student (id, name, age)
VALUES (1,'철수',17);
```

괄호 구분:

| 위치 | 들어가는 것 |
| --- | --- |
| `student (...)` | 컬럼명 |
| `VALUES (...)` | 실제 값 |

## UPDATE

```
UPDATE student
SET age=18
WHERE name='철수';
```

뜻:

```
name이 철수인 학생의 age를 18로 수정
```

주의:

```
UPDATE student
SET age=18;
```

이렇게 `WHERE` 없으면 **전체 학생 age가 18로 바뀜**.

## DELETE

```
DELETEFROM student
WHERE id=1;
```

뜻:

```
id가 1인 행 삭제
```

주의:

```
DELETE FROM student;
```

이렇게 쓰면 **모든 데이터 삭제**.

---