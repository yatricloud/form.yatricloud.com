import { createClient } from '@supabase/supabase-js';
import { SurveyData } from './types';
import { validateSurveyData } from './validation';
import { ApiError, ValidationError } from './errors';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function submitSurvey(data: SurveyData): Promise<boolean> {
  try {
    validateSurveyData(data);
    
    const formattedData = {
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      contact_number: data.contactNumber,
      country: data.country,
      state: data.state || null,
      address: data.address || null,
      gender: data.gender,
      linkedin_profile: data.linkedinProfile || null,
    };

    const { error } = await supabase
      .from('survey_responses')
      .insert([formattedData]);

    if (error) {
      console.error('Supabase error:', error);
      if (error.code === '23505') {
        throw new ValidationError('This email has already been registered');
      }
      throw new ApiError(error.message);
    }

    return true;
  } catch (error) {
    if (error instanceof ValidationError || error instanceof ApiError) {
      throw error;
    }
    console.error('Submission error:', error);
    throw new ApiError('Failed to submit survey');
  }
}