import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Language } from '../types';

export const useLanguages = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('languages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLanguages(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch languages');
    } finally {
      setLoading(false);
    }
  };

  const addLanguage = async (language: Omit<Language, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('languages')
        .insert([language])
        .select()
        .single();

      if (error) throw error;
      setLanguages(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add language');
      throw err;
    }
  };

  const updateLanguage = async (id: string, updates: Partial<Language>) => {
    try {
      const { data, error } = await supabase
        .from('languages')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setLanguages(prev => prev.map(lang => lang.id === id ? data : lang));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update language');
      throw err;
    }
  };

  const deleteLanguage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('languages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setLanguages(prev => prev.filter(lang => lang.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete language');
      throw err;
    }
  };

  return { 
    languages, 
    loading, 
    error, 
    addLanguage, 
    updateLanguage, 
    deleteLanguage, 
    refreshLanguages: fetchLanguages 
  };
};