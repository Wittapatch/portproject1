from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate

def generate_true_category(inputTask: str, categories: list[str]):

    model = OllamaLLM(model="llama3.2")

    template="""
    You are an expert at distinguishing which task should be in what categories

    Here are the category list: {categories}

    Here is the input task: {inputtask}

    Here is the question to answer: {question}
    """

    prompt = ChatPromptTemplate.from_template(template)
    chain = prompt | model

    result = chain.invoke({"categories": categories,
                            "inputtask": inputTask,
                            "question": "This input task should belong to which category please answer the category name only"})
    return result