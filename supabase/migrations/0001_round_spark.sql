/*
  # Create Survey Responses Table

  1. New Tables
    - `survey_responses`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `first_name` (text)
      - `last_name` (text)
      - `contact_number` (text)
      - `country` (text)
      - `state` (text)
      - `address` (text)
      - `gender` (text)
      - `linkedin_profile` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `survey_responses` table
    - Add policies for:
      - Insert: Allow authenticated users to insert their own data
      - Select: Allow authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  contact_number text NOT NULL,
  country text NOT NULL,
  state text,
  address text,
  gender text NOT NULL,
  linkedin_profile text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert their own responses"
  ON survey_responses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can read their own responses"
  ON survey_responses
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);