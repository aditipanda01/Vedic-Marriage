import { useState } from 'react';
import { User } from '@/types/user';

interface ProfileFormProps {
  user: User;
  onSave: (data: Partial<User>) => Promise<void>;
}

export default function ProfileForm({ user, onSave }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || '',
    dateOfBirth: user.dateOfBirth || '',
    gender: user.gender || '',
    location: user.location || '',
    occupation: user.occupation || '',
    education: user.education || '',
    about: user.about || '',
    interests: user.interests || [],
    religion: user.religion || '',
    caste: user.caste || '',
    motherTongue: user.motherTongue || '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await onSave(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="label">
            First name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="input"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="label">
            Last name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="input"
          />
        </div>

        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input"
          />
        </div>

        <div>
          <label htmlFor="phone" className="label">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="label">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label htmlFor="gender" className="label">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="location" className="label">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label htmlFor="occupation" className="label">
            Occupation
          </label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label htmlFor="education" className="label">
            Education
          </label>
          <input
            type="text"
            id="education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label htmlFor="religion" className="label">
            Religion
          </label>
          <input
            type="text"
            id="religion"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label htmlFor="caste" className="label">
            Caste
          </label>
          <input
            type="text"
            id="caste"
            name="caste"
            value={formData.caste}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label htmlFor="motherTongue" className="label">
            Mother Tongue
          </label>
          <input
            type="text"
            id="motherTongue"
            name="motherTongue"
            value={formData.motherTongue}
            onChange={handleChange}
            className="input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="about" className="label">
          About
        </label>
        <textarea
          id="about"
          name="about"
          rows={4}
          value={formData.about}
          onChange={handleChange}
          className="input"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
} 