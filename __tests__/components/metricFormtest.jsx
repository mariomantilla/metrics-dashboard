import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import NewMetricForm from '../../app/components/metricForm'
 
describe('Metric Form', () => {
	it('has a the form tag', () => {
		render(<NewMetricForm />)
	
		const heading = screen.getByRole('form', {
			name: "Add a mew metric"
		})
		expect(heading).toBeInTheDocument()
	})
})