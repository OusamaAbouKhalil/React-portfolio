import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Certificate } from '../types';

export const useCertificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setCertificates(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch certificates');
    } finally {
      setLoading(false);
    }
  };

  const addCertificate = async (certificate: Omit<Certificate, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .insert([certificate])
        .select()
        .single();

      if (error) throw error;
      setCertificates(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add certificate');
      throw err;
    }
  };

  return { certificates, loading, error, addCertificate, refreshCertificates: fetchCertificates };
};