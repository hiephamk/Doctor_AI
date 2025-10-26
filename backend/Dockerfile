FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
RUN python3 manage.py collectstatic --noinput
CMD ["gunicorn", "main.wsgi:application", "-b", "0.0.0.0:8000"]