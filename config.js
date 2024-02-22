// proxy server
const SERVICE_URL = 'http://localhost:3500';

const ACCESS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjZkNGE0NmY4NGU1Nzg1Y2I5ZjQ1OWU2YWVmMDE2Y2MxMjVkZmYyZmFhODNhM2VlOTgxYjUzNTI0ZWY4M2NlYjE3MTdhZGVkMmI1MmMxZWRhIn0.eyJhdWQiOiJkMDU0OTI4Ni1jZWM1LTQ4NWEtOThlNi05MTIwZWI4YmZmYmYiLCJqdGkiOiI2ZDRhNDZmODRlNTc4NWNiOWY0NTllNmFlZjAxNmNjMTI1ZGZmMmZhYTgzYTNlZTk4MWI1MzUyNGVmODNjZWIxNzE3YWRlZDJiNTJjMWVkYSIsImlhdCI6MTcwODUxNTcxMCwibmJmIjoxNzA4NTE1NzEwLCJleHAiOjE3MTAwMjg4MDAsInN1YiI6IjEwNzA1OTEwIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNTg0ODg2LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiODZmZGYxNzktYWYyMC00YjljLWFlNmEtZTNhNDc2NDFmOGM2In0.Npx3X_icHCIfCXtEG2wnUxvAWsdyFkm60dFDeb4fHHETgSur9oOu77k_FG0ijCbqILxe6ihW7Llo5wbLncnrrXuKhu0mJVjFBZjYyeyKSgQTvwmhe6MKgbOT5PgMInil2Pm5hZ81MS_1x4LTSivgRbk0fLpeMEllwos8TWNqk2JPNrsEu_h_ReofSjK7Oeoi1zLWMf-zlcIWAHIybfaXQR03oquf1fo2_LiiILbZ3cGLLy25BTGmsFcXXUfx26WmDdudyMmAYkCQs7kDvaxfOCQcqHex1GflcKI_Kz3pqGWOKbOQdHMv5X0AxcapuovPM_JiAbejqpYKXN6j1E7ZMw';

const COLLUMS = [
  {
    title: 'ID',
    prop: 'id'
  },
  {
    title: 'Название',
    prop: 'name'
  },
  {
    title: 'Бюджет',
    prop: 'price'
  },
  {
    title: 'Ответственное лицо',
    prop: 'responsible_user_id'
  },
  {
    title: 'Дата создания',
    prop: 'created_at'
  },
  {
    title: 'Дата изменения',
    prop: 'updated_at'
  }
]
