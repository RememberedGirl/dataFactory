## Класс DataStructure

### Описание
Класс `DataStructure` предназначен для представления данных и управления ими. Он используется для описания параметров и данных, необходимых для рисования графиков и других визуализаций данных.

### Свойства

- `general`: Общая информация о структуре данных.
    - `renderTo`: ID элемента, в который будет отрисован виджет.
    - `type`: Тип виджета.
- `colors`: Массив цветов для использования в виджете.
- `data`: Данные, содержащие информацию о столбцах, строках, значениях и т.д.
    - `cols`: Массив столбцов, содержащих названия и другую информацию.
    - `rows`: Массив строк, содержащих значения для каждого столбца.
    - `values`: Массив значений для каждой ячейки.
    - `colsMeta`: Метаданные для каждого столбца.
    - `colsInfo`: Информация о каждом столбце.
    - `totals`: Общие итоги.
    - `colsDataType`: Типы данных для каждого столбца.
    - `colHeaders`: Заголовки столбцов.
    - `rowHeaders`: Заголовки строк.

### Методы

- `constructor(options)`: Создает экземпляр класса `DataStructure` и инициализирует его данными из переданного объекта `options`.
- `getGeneralInfo()`: Возвращает общую информацию о структуре данных.
- `getColors()`: Возвращает массив цветов, используемых в виджете.
- `getData()`: Возвращает данные о структуре данных.


### Строки (rows)
- `rows`: Массив строк, содержащих значения для каждого столбца. Каждая строка представлена массивом, где каждый элемент соответствует значению столбца.

### Столбцы (cols)
- `cols`: Массив столбцов, содержащих названия и другую информацию. Каждый столбец представлен массивом, где первый элемент - идентификатор столбца, а второй элемент (если есть) - описание или метаданные о столбце.

- `colsMeta`: Метаданные для каждого столбца. Этот массив содержит объекты, описывающие метаданные каждого столбца. В объекте могут присутствовать следующие свойства:
  - `measureGroupId`: Идентификатор группы измерений столбца.
  - `measureId`: Идентификатор измерения столбца.
  - `dimensions`: Измерения столбца.

- `colsInfo`: Информация о каждом столбце. Этот массив содержит объекты, описывающие каждый столбец. В объекте могут присутствовать следующие свойства:
  - `id`: Идентификатор столбца.
  - `idParts`: Массив, содержащий части идентификатора столбца.

- `colsDataType`: Типы данных для каждого столбца. Этот массив содержит информацию о типах данных для каждого столбца.

- `colHeaders`: Заголовки столбцов. Этот массив содержит названия столбцов.


```json
{
  "data": {
    "cols": [
      ["product_id", "Product Type"],
      ["price", "Product Type"],
      ["quantity", "Product Type"],
      ["Total Sales"]
    ],
    "rows": [
      ["2023-02-28", "2"],
      ["2023-03-01", "3"],
      ["2023-03-02", "3"]
    ],
    "values": [
      [10, 15, 10],
      [20, 25, 20],
      [5, 5, 5],
      [100, 130, 100]
    ],
    "colsMeta": [
      {
        "measureGroupId": ["Sales_Report"],
        "measureId": [],
        "dimensions": ["Product Type"]
      },
      {
        "measureGroupId": ["Sales_Report"],
        "measureId": ["price"],
        "dimensions": ["Product Type"]
      },
      {
        "measureGroupId": ["Sales_Report"],
        "measureId": ["quantity"],
        "dimensions": ["Product Type"]
      },
      null
    ],
    "colsInfo": [
      {
        "id": "\"Sales_Report\",\"product_id\",\"Product Type\"",
        "idParts": ["Sales_Report", "product_id", "Product Type"]
      },
      {
        "id": "\"Sales_Report\",\"price\",\"Product Type\"",
        "idParts": ["Sales_Report", "price", "Product Type"]
      },
      {
        "id": "\"Sales_Report\",\"quantity\",\"Product Type\"",
        "idParts": ["Sales_Report", "quantity", "Product Type"]
      },
      {
        "id": "\"Total Sales\"",
        "idParts": ["Total Sales"]
      }
    ],
    "totals": [],
    "colsDataType": ["integer", "integer", "integer", null],
    "colHeaders": ["Product Type", "price", "quantity", "Total Sales"],
    "rowHeaders": ["Date", "Month Number"]
  }
}

```
```json
{
  "data": {
    "cols": [
      ["название_продукта", "Тип Продукта"],
      ["цена", "Тип Продукта"],
      ["количество", "Тип Продукта"],
      ["Общие Продажи"]
    ],
    "rows": [
      ["2023-02-28", "2"],
      ["2023-03-01", "3"],
      ["2023-03-02", "3"]
    ],
    "values": [
      [10, 15, 10],
      [20, 25, 20],
      [5, 5, 5],
      [100, 130, 100]
    ],
    "colsMeta": [
      {
        "measureGroupId": ["Отчет_о_продажах"],
        "measureId": [],
        "dimensions": ["Тип Продукта"]
      },
      {
        "measureGroupId": ["Отчет_о_продажах"],
        "measureId": ["цена"],
        "dimensions": ["Тип Продукта"]
      },
      {
        "measureGroupId": ["Отчет_о_продажах"],
        "measureId": ["количество"],
        "dimensions": ["Тип Продукта"]
      },
      null
    ],
    "colsInfo": [
      {
        "id": "\"Отчет_о_продажах\",\"название_продукта\",\"Тип Продукта\"",
        "idParts": ["Отчет_о_продажах", "название_продукта", "Тип Продукта"]
      },
      {
        "id": "\"Отчет_о_продажах\",\"цена\",\"Тип Продукта\"",
        "idParts": ["Отчет_о_продажах", "цена", "Тип Продукта"]
      },
      {
        "id": "\"Отчет_о_продажах\",\"количество\",\"Тип Продукта\"",
        "idParts": ["Отчет_о_продажах", "количество", "Тип Продукта"]
      },
      {
        "id": "\"Общие Продажи\"",
        "idParts": ["Общие Продажи"]
      }
    ],
    "totals": [],
    "colsDataType": ["целое число", "целое число", "целое число", null],
    "colHeaders": ["Тип Продукта", "цена", "количество", "Общие Продажи"],
    "rowHeaders": ["Дата", "Номер Месяца"]
  }
}

```