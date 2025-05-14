'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Segment {
  id: string;
  name: string;
  rules: any;
  createdAt: string;
}

export default function SegmentsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [segments, setSegments] = useState<Segment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [rules, setRules] = useState<any>({
    operator: 'AND',
    conditions: [
      {
        field: 'spend',
        operator: '>',
        value: 10000
      }
    ]
  });

  const handleCreateSegment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/segments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: segmentName,
          rules,
        }),
      });

      if (response.ok) {
        const newSegment = await response.json();
        setSegments([...segments, newSegment]);
        setShowForm(false);
        setSegmentName('');
        setRules({
          operator: 'AND',
          conditions: [
            {
              field: 'spend',
              operator: '>',
              value: 10000
            }
          ]
        });
      }
    } catch (error) {
      console.error('Error creating segment:', error);
    }
  };

  const addCondition = () => {
    setRules({
      ...rules,
      conditions: [
        ...rules.conditions,
        {
          field: 'spend',
          operator: '>',
          value: 10000
        }
      ]
    });
  };

  const updateCondition = (index: number, field: string, value: any) => {
    const newConditions = [...rules.conditions];
    newConditions[index] = {
      ...newConditions[index],
      [field]: value
    };
    setRules({
      ...rules,
      conditions: newConditions
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Audience Segments</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {showForm ? 'Cancel' : 'Create Segment'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <form onSubmit={handleCreateSegment}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Segment Name
                </label>
                <input
                  type="text"
                  value={segmentName}
                  onChange={(e) => setSegmentName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Rules
                </label>
                <div className="mt-2 space-y-4">
                  {rules.conditions.map((condition: any, index: number) => (
                    <div key={index} className="flex space-x-4">
                      <select
                        value={condition.field}
                        onChange={(e) => updateCondition(index, 'field', e.target.value)}
                        className="rounded-md border-gray-300"
                      >
                        <option value="spend">Total Spend</option>
                        <option value="visits">Number of Visits</option>
                        <option value="lastPurchase">Days Since Last Purchase</option>
                      </select>
                      <select
                        value={condition.operator}
                        onChange={(e) => updateCondition(index, 'operator', e.target.value)}
                        className="rounded-md border-gray-300"
                      >
                        <option value=">">Greater Than</option>
                        <option value="<">Less Than</option>
                        <option value="==">Equals</option>
                      </select>
                      <input
                        type="number"
                        value={condition.value}
                        onChange={(e) => updateCondition(index, 'value', parseInt(e.target.value))}
                        className="rounded-md border-gray-300"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addCondition}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    + Add Condition
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Create Segment
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Your Segments
            </h3>
            {segments.length === 0 ? (
              <p className="text-gray-500">No segments created yet.</p>
            ) : (
              <div className="space-y-4">
                {segments.map((segment) => (
                  <div
                    key={segment.id}
                    className="border rounded-lg p-4 hover:bg-gray-50"
                  >
                    <h4 className="text-lg font-medium text-gray-900">
                      {segment.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Created on {new Date(segment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 