require('dotenv').config()
const supabase = require('./supabaseCliente')
const { publicacoes } = require('./models/articles')

async function migrar() {
    const dadosFormatados = publicacoes.map(p => ({
        thumb_image: p.thumbImage,
        thumb_image_alt_text: p.thumbImageAltText,
        title: p.title,
        description: p.description,
        profile_thumb_image: p.profileThumbImage,
        profile_name: p.profileName,
        post_date: p.postDate
    }))

    const { data, error } = await supabase.from('articles').insert(dadosFormatados)

    if (error) {
        console.error('Erro ao migrar:', error)
    } else {
        console.log('Migração concluída com sucesso!', data)
    }
}

migrar()