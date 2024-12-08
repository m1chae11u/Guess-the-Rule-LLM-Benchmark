import random
from openai import OpenAI
import string
import os

# Set your OpenAI API key (or any other LLM provider's key)
OPENAI_KEY = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=OPENAI_KEY)

# Define the rule templates for each rule type.
rule_templates = {
    "attribute_based": "Generate a rule based on a single object attribute like color, size, or shape.",
    "categorical": "Generate a rule based on a specific category of objects.",
    "relational": "Generate a rule based on a relational attribute between objects (e.g., size, weight).",
    "logical": "Generate a rule that combines two attributes using logical conditions like AND or OR.",
    "semantic": "Generate a rule that involves objects related by their use or context (e.g., used in a kitchen)."
}

# Dictionary to store rules under each rule type
rules_storage = {
    "attribute_based": [],
    "categorical": [],
    "relational": [],
    "logical": [],
    "semantic": []
}

# Function to send a prompt to the LLM and get the response
def get_llm_response(prompt, sysprompt=None):
    response = client.chat.completions.create(model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": sysprompt},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7)
    return response.choices[0].message.content.strip()

# Function to generate a rule prompt for each rule type
def generate_rule_prompt(rule_type):
    template_prompt = rule_templates[rule_type]
    return template_prompt

# Function to collect and process the LLM outputs from the rule prompt
def generate_rule_with_llm(rule_type):
    # Generate the template prompt based on the rule type
    prompt = generate_rule_prompt(rule_type)
    
    # Call the LLM with the prompt to generate a specific rule
    llm_response = get_llm_response(prompt)
    
    # Process and return the rule generated by the LLM
    return llm_response

# Function to generate and store the rule under the correct rule type
def generate_and_store_rule():
    # Randomly select a rule type
    rule_type = random.choice(list(rule_templates.keys()))
    
    # Get the specific rule from the LLM based on the rule type
    rule = generate_rule_with_llm(rule_type)
    
    # Store the rule in the correct category within rules_storage
    rules_storage[rule_type].append(rule)
    
    print(f"Generated rule type: {rule_type}")
    print(f"Rule: {rule}")
    
    return rule_type, rule

def generate_rule_chatgpt(rngstate, domain=None, difficulty=None, init_examples=None):
    prompt = "Generate a rule based on the following criteria:\n"
    if domain:
        prompt += f"Domain: {domain}\n"
    if difficulty:
        prompt += f"Difficulty: {difficulty}\n"
    if init_examples:
        prompt += f"Examples: {init_examples}\n"
    prompt += f'''Examples:
    def has_at_least_two_vowels(x: string):
        return sum([c in 'aeiou' for c in x]) >= 2
    locals()['generated_fn'] = has_at_least_two_vowels
    pass

    def has_less_than_two_vowels(x: string):
        return not has_at_least_two_vowels(x)
    locals()['generated_fn'] = has_less_than_two_vowels
    pass

    def starts_with_first_half_alphabet(x: string):
        return ord(x[0]) - ord('a') < 13
    locals()['generated_fn'] = starts_with_first_half_alphabet
    pass'''
    prompt += "Generated code:"
    ans = get_llm_response(prompt=prompt, sysprompt='Output exactly one lambda function which outputs "True" or "False" according to some creative rule. The function should be aptly named. Then you should assign generated_fn to the function you create. This is executable code, so do not add any other uncommented explanatory text. Do NOT add grave markers for the code block. You should be defining a function using the "def" python keyword, and then assigning generated_fn to that function, in the locals dict. Then have a line with "pass".')
    ans_strip = ''
    for line in ans.splitlines():
        if not line.startswith('```'):
            ans_strip += line + '\n'
    print(ans_strip)
    generated_fn = None
    try:
        local_namespace = {}
        exec(ans_strip, globals(), local_namespace)
        if 'generated_fn' in local_namespace:
            generated_fn = local_namespace['generated_fn']
        else:
            raise Exception('problem assigning "generated_fn"') 
    except SyntaxError as e:
        print("Syntax Error in Generated Code:", e)
        return
    # print(generated_fn)
    return random.getstate(), generated_fn

def word_generator(rngstate, k):
    random.setstate(rngstate)
    word = ''.join(random.choice(string.ascii_lowercase) for _ in range(k))
    return random.getstate(), word

def make_word_generator(k):
    return lambda rngstate: word_generator(rngstate, k)

def generate_rule(rngstate, domain=None, difficulty=None, init_examples=None):
    def has_at_least_two_vowels(x: string):
        return sum([c in 'aeiou' for c in x]) >= 2
    def has_less_than_two_vowels(x: string):
        return not has_at_least_two_vowels(x)
    def starts_with_first_half_alphabet(x: string):
        return ord(x[0]) - ord('a') < 13
    random.setstate(rngstate)
    fn = random.choice([has_at_least_two_vowels, has_less_than_two_vowels, starts_with_first_half_alphabet])
    return random.getstate(), fn


def generate_rule_game(rngstate, domain=None, difficulty=None, init_examples=None, use_llm=False):
    genrule = generate_rule_chatgpt if use_llm else generate_rule
    rngstate, rule =  genrule(rngstate, domain, difficulty, init_examples)
    wordgen = make_word_generator(4)
    return [rngstate, rule, wordgen]

def generate_more_examples(rule_game_instance):
    rngstate, rule, word_generator = rule_game_instance
    rngstate, random_word = word_generator(rngstate)
    return [rngstate, random_word, rule(random_word)]

# Main loop to generate and display a set of rules, and store them
if __name__ == "__main__":
    random.seed(41)
    print('Lexical style rules (string manipulation)')
    print('5 random game instances (hardcoded rule fns)')
    for i in range(5):
        print(f'Game {i}')
        rngstate, rule, wordgen = generate_rule_game(random.getstate())
        print(f'DEBUG: secret rule is: {rule.__name__}')
        for _ in range(10):
            rngstate, random_word, is_rule_true = generate_more_examples((rngstate, rule, wordgen))
            print(random_word, is_rule_true)
    print('5 random game instances (LLM generated rules)')
    for i in range(5):
        print(f'Game {i}')
        rngstate, rule, wordgen = generate_rule_game(random.getstate(), use_llm=True)
        print(f'DEBUG: secret rule is: {rule.__name__}')
        for _ in range(10):
            rngstate, random_word, is_rule_true = generate_more_examples((rngstate, rule, wordgen))
            print(random_word, is_rule_true)
    