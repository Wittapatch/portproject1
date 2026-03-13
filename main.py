from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate

def generate_true_category(inputTask: str, categories: list[str]):

    model = OllamaLLM(model="llama3.2")

    template="""
    You are a strict task classifier.

    Available categories:
    {categories}

    Task:
    {inputtask}

    Rules:
    - Choose exactly one category from the available categories
    - Return only the category name
    - Do not explain
    - Do no write anything else
    - Just give the name of the category that the task should belong to
    """

    prompt = ChatPromptTemplate.from_template(template)
    chain = prompt | model

    result = chain.invoke({"categories": categories,
                            "inputtask": inputTask,
                            "question": "This input task should belong to which category please answer the category name only"})
    return result