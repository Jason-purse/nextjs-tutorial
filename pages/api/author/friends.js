const friends = {
    '1': [
        'lisi',
        'wangwu',
        'jackson'
    ],
    '2': [
        'zs',
        'xiena',
        'yangmi',
        'msy'
    ],
    '3': [
        'jasonj'
    ]
};

export default function Friends(request, response) {
    let {author,authorId} = request.query;
    if (author) {
        if (author === 'zs') {
            response.status(200).json({data: {id: 1, author}})
        } else if (author === 'lisi') {
            response.status(200).json({data: {id: 2, author}})
        } else if (author === 'jason') {
            response.status(200).json({data: {id: 3, author}})
        } else {
            response.status(400).json({message: "no author info !!!"})
        }
    }
    else if(authorId) {
        let data = friends[authorId]
        if(data) {
            response.status(200).json({data})
        }
        response.status(400).json({message: "no authorId map friends info ..."})
    }
    else {
        response.status(400).json({message: "no author param,is must exist !!!"})
    }
}