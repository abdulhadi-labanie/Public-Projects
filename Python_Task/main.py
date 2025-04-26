import os
import json

folder_path = '.\\profiles'

def get_Companies_Skills(folder_path):
    companies_and_skills = {}

    for file_name in os.listdir(folder_path):  # get files names
        if file_name.endswith('.json'):  # Read all json files
            file_path = os.path.join(folder_path, file_name)
            #-------------
            try:
                with open(file_path, 'r', encoding='utf-8') as file:
                    data = json.load(file)

                if len(data['companies']) >= 3:
                    for company in data['companies']:
                        if company not in companies_and_skills:
                            companies_and_skills[company] = {         # bild dict for example in line 95.
                                "Employees_Numbers": 0,
                                "skills": {}
                            }

                        companies_and_skills[company]['Employees_Numbers'] += 1

                        for skill in data['skills']:
                            if skill not in companies_and_skills[company]['skills']:
                                companies_and_skills[company]['skills'][skill] = 0
                            companies_and_skills[company]['skills'][skill] += 1

            except Exception as e:
                print(f"Error in {file_name}\n")
    return companies_and_skills

def calculate_language_given_company_probability(companies_and_skills):
    results = []

    all_skills = []

    for company in companies_and_skills:
        for skill in companies_and_skills[company]['skills']:
            if skill not in all_skills:
                all_skills.append(skill)

    # bild dict for example in line 110.

    for skill in all_skills:
        skill_result = {
            'probability': skill,
            'p_language_given_company': {}
        }

        for company in companies_and_skills:
            employees_number = companies_and_skills[company]['Employees_Numbers']
            skill_count = companies_and_skills[company]['skills'].get(skill, 0)

            if employees_number > 0:
                probability = skill_count / employees_number
            else:
                probability = 0

            skill_result['p_language_given_company'][company] = probability

        results.append(skill_result)

    return results

def print_probability_result():
    result = []

    probability = calculate_language_given_company_probability(get_Companies_Skills(folder_path))

    for skill in probability:
        skill_name = skill['probability']
        for company_name, prob in skill['p_language_given_company'].items():
            result.append((skill_name, company_name, prob)) # Save result as tuple

    #result.sort(key=lambda x: x[2], reverse=True)

    return result

def Print_after_format_probability_resutl():

    result = print_probability_result()

    for skill_name, company_name, prob in result:
        print(f"P({skill_name}|{company_name}) = {prob:.2f}")


Print_after_format_probability_resutl()



#######
# comp = {
#    'Netflix': {
#        'Emploees_Numbers': 3396,
#        'skills': {
#            'JavaScript': 1880,
#            'Rust': 2147,
#            'Python': 1941,
#            'Ruby': 1900,
#            'Go': 1951
#        }
#    }
#}
#######

######
# p_language_given_company = {
#    'probability' : 'JavaScript', 
#    'p_language_given_company': {
#            'Facebook' : 0.60,
#            'Netflix': 0.70
#        }
#    }
######