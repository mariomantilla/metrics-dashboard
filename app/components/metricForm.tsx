'use client';

import { useState } from 'react';

export default function NewMetricForm() {
    const [name, setName] = useState('');
    const [value, setValue] = useState<number | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('/api/metrics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, value }),
        });
        setName('');
        setValue(null);
    };

    return (
        <div className='border-2 p-2 rounded-lg'>
            <form onSubmit={handleSubmit} aria-label="Add a mew metric" className='flex flex-row items-center gap-4'>
                <Input
                    type="text"
                    placeholder="Metric name"
                    value={name}
                    setValueFnc={setName}
                />
                <Input
                    type="number"
                    placeholder="Value"
                    value={value}
                    setValueFnc={setValue}
                />
                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded min-w-fit'>
                    Add new metric
                </button>
            </form>
        </div>
    );
}

const Input = ({ type, placeholder, value, setValueFnc }: {
    type: "number" | "text",
    placeholder: string,
    value: number | string | null,
    setValueFnc: Function
}) => {
    return (
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type={type}
            placeholder={placeholder}
            value={value ?? ''}
            onChange={(e) => setValueFnc(type == "text" ? e.target.value : parseFloat(e.target.value))}
            required
        />
    )
}