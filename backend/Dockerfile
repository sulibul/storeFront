FROM python:3.11

ENV PYTHONNUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/backend

COPY requirements.txt /app/backend/

RUN pip install -r requirements.txt



COPY . /app/backend/

CMD [ "python", "-u", "manage.py", "runserver", "0.0.0.0:8000"]