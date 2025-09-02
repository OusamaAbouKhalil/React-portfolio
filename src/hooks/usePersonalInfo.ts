import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { PersonalInfo } from '../types';

export const usePersonalInfo = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  const fetchPersonalInfo = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('personal_info')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setPersonalInfo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch personal info');
    } finally {
      setLoading(false);
    }
  };

  const updatePersonalInfo = async (info: Omit<PersonalInfo, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('personal_info')
        .upsert([{ ...info, updated_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) throw error;
      setPersonalInfo(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update personal info');
      throw err;
    }
  };

  return { personalInfo, loading, error, updatePersonalInfo, refreshPersonalInfo: fetchPersonalInfo };
};