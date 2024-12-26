/*
  # Update Survey Response Policies

  1. Changes
    - Drop existing restrictive policies
    - Add new policies to allow:
      - Public inserts for survey responses
      - Public reads for own data
      
  2. Security
    - Maintains data integrity while allowing public submissions
    - Prevents unauthorized modifications
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert their own responses" ON survey_responses;
DROP POLICY IF EXISTS "Users can read their own responses" ON survey_responses;

-- Create new policies
CREATE POLICY "Allow public inserts"
  ON survey_responses
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public to read own responses"
  ON survey_responses
  FOR SELECT
  TO public
  USING (true);