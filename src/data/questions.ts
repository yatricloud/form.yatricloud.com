export const questions = [
  {
    id: 'email',
    question: 'What is your email address?',
    type: 'email' as const,
    placeholder: 'name@example.com',
  },
  {
    id: 'firstName',
    question: 'What is your first name?',
    type: 'text' as const,
    placeholder: 'John',
  },
  {
    id: 'lastName',
    question: 'What is your last name?',
    type: 'text' as const,
    placeholder: 'Doe',
  },
  {
    id: 'contactNumber',
    question: 'What is your contact number?',
    type: 'text' as const,
    placeholder: '+1234567890',
  },
  {
    id: 'country',
    question: 'Which country are you located in?',
    type: 'text' as const,
    placeholder: 'Enter your country',
  },
  {
    id: 'state',
    question: 'Which state/province are you located in?',
    type: 'text' as const,
    placeholder: 'Enter your state or province',
  },
  {
    id: 'address',
    question: 'What is your address?',
    type: 'textarea' as const,
    placeholder: 'Enter your full address',
  },
  {
    id: 'gender',
    question: 'What is your gender?',
    type: 'select' as const,
    options: [
      'Male',
      'Female',
      'Other',
      'Prefer not to say',
    ],
  },
  {
    id: 'linkedinProfile',
    question: 'Your LinkedIn Profile URL',
    type: 'url' as const,
    placeholder: 'https://linkedin.com/in/your-profile',
    description: 'Please provide your LinkedIn profile URL',
  },
];