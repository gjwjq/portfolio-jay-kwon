---
title: "0604 - RESTRICT / 외래키 옵션"
---

이 페이지는 **참조 무결성 옵션**만 정리.

## RESTRICT

발음: **리스트릭트**

뜻:

```
다른 테이블에서 참조 중이면 삭제/수정 못 하게 막음
```

예시:

```
CREATETABLE emp (
  emp_idINTPRIMARYKEY,
  dept_idINT,
FOREIGNKEY (dept_id)
REFERENCES dept(dept_id)
ONDELETERESTRICT
);
```

뜻:

```
emp 테이블이 dept를 참조 중이면
dept 데이터 삭제 불가
```

## 외래키 옵션 비교

| 옵션 | 의미 |
| --- | --- |
| `RESTRICT` | 참조 중이면 삭제/수정 막음 |
| `CASCADE` | 부모 삭제 시 자식도 같이 삭제 |
| `SET NULL` | 부모 삭제 시 자식 외래키를 NULL로 바꿈 |

암기:

```
RESTRICT = 막음
CASCADE = 같이 감
SET NULL = NULL로 바꿈
```