import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Skill } from '../types';

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('level', { ascending: false });

      if (error) throw error;
      setSkills(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  const addSkill = async (skill: Omit<Skill, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .insert([skill])
        .select()
        .single();

      if (error) throw error;
      setSkills(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add skill');
      throw err;
    }
  };

  const updateSkill = async (id: string, updates: Partial<Skill>) => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setSkills(prev => prev.map(skill => skill.id === id ? data : skill));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update skill');
      throw err;
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSkills(prev => prev.filter(skill => skill.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete skill');
      throw err;
    }
  };

  return { 
    skills, 
    loading, 
    error, 
    addSkill, 
    updateSkill, 
    deleteSkill, 
    refreshSkills: fetchSkills 
  };
};