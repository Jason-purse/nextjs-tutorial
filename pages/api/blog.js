export const results = [
    { title: 'John Doe1' },
    { title: 'John Doe2' },
    { title: 'John Doe3' }
]
export default function handler(req, res) {
    res.status(200).json(results)
}
