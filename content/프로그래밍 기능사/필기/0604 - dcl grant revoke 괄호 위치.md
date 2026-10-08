---
title: "0604 - DCL / GRANT / REVOKE / 괄호 위치"
---

이 페이지는 **권한 주고 뺏는 것**만 정리.

## GRANT

권한 부여.

```
GRANT 권한ON 테이블명TO 사용자;
```

예시:

```
GRANTSELECTON studentTO user1;
```

뜻:

```
user1에게 student 테이블 조회 권한 부여
```

## REVOKE

권한 회수.

```
REVOKE 권한 ON 테이블명FROM 사용자;
```

예시:

```
REVOKE SELECT ON student FROM user1;
```

뜻:

```
user1에게서 student 조회 권한 회수
```

## 괄호 안에 뭐 넣는지

### 테이블 전체 권한

```
GRANT SELECT ON student TO user1;
```

괄호 없음.

### 특정 컬럼만 수정 권한

```
GRANT UPDATE(name, age)ON studentTO user1;
```

괄호 안에는 **컬럼명**.

뜻:

```
user1은 student 테이블에서 name, age 컬럼만 수정 가능
```

암기:

```
GRANT UPDATE(컬럼명) ON 테이블명 TO 사용자;
```