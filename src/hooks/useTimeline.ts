import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { TimelineItem } from '../types';

export const useTimeline = () => {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTimeline();
  }, []);

  const fetchTimeline = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('timeline')
        .select('*')
        .order('period', { ascending: false });

      if (error) throw error;
      setTimeline(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch timeline');
    } finally {
      setLoading(false);
    }
  };

  const addTimelineItem = async (item: Omit<TimelineItem, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('timeline')
        .insert([item])
        .select()
        .single();

      if (error) throw error;
      setTimeline(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add timeline item');
      throw err;
    }
  };

  const updateTimelineItem = async (id: string, updates: Partial<TimelineItem>) => {
    try {
      const { data, error } = await supabase
        .from('timeline')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setTimeline(prev => prev.map(item => item.id === id ? data : item));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update timeline item');
      throw err;
    }
  };

  const deleteTimelineItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('timeline')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTimeline(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete timeline item');
      throw err;
    }
  };

  return { 
    timeline, 
    loading, 
    error, 
    addTimelineItem, 
    updateTimelineItem, 
    deleteTimelineItem, 
    refreshTimeline: fetchTimeline 
  };
};