---
title: "0604 - SQL 기본 분류 / DDL / DML / DCL"
---

이 페이지는 **SQL이 뭔 종류로 나뉘는지**만 정리.

| 분류 | 의미 | 대표 명령어 |
| --- | --- | --- |
| DDL | 구조 정의 | `CREATE`, `ALTER`, `DROP`, `TRUNCATE` |
| DML | 데이터 조작 | `SELECT`, `INSERT`, `UPDATE`, `DELETE` |
| DCL | 권한 제어 | `GRANT`, `REVOKE` |
| TCL | 트랜잭션 제어 | `COMMIT`, `ROLLBACK` |

암기:

```
DDL = 테이블 구조
DML = 실제 데이터
DCL = 권한
TCL = 저장/취소
```

헷갈리는 비교:

| 명령어 | 분류 | 뜻 |
| --- | --- | --- |
| `DELETE` | DML | 데이터 행 삭제 |
| `DROP` | DDL | 테이블 자체 삭제 |
| `TRUNCATE` | DDL | 테이블 구조는 두고 데이터 전체 삭제 |
| `GRANT` | DCL | 권한 부여 |
| `REVOKE` | DCL | 권한 회수 |

---