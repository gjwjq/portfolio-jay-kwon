---
title: "0524 - TCP/IP 계층"
---

| TCP/IP 계층 | 역할/키워드 | 대표 프로토콜 | OSI 대응 |
| --- | --- | --- | --- |
| 4. 응용 계층(Application) | 사용자 서비스, 웹, 메일, 파일 전송 | HTTP, HTTPS, FTP, SMTP, POP3, IMAP, DNS, SSH, Telnet, SNMP | 5~7계층 (세션+표현+응용) |
| 3. 전송 계층(Transport) | 종단 간 통신, 신뢰성, 포트 번호 | TCP, UDP | 4계층 (전송 계층) |
| 2. 인터넷 계층(Internet) | IP 주소, 경로 설정, 패킷 전달 | IP, ARP, RARP, ICMP, IGMP | 3계층 (네트워크 계층) |
| 1. 네트워크 액세스 계층(Network Access) | 실제 데이터 전송, MAC 주소 | Ethernet, PPP, HDLC | 1~2계층 (물리+데이터링크) |

[[0524 - sql|0524 - sql]]