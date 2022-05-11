import { useState } from 'react'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'

import NewsletterForm from '@/components/NewsletterForm'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const MAX_DISPLAY = 64

export async function getStaticProps() {
  const questions = await getAllFilesFrontMatter('questions')

  return { props: { questions } }
}

const Question = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false)
  const onClick = () => setShowAnswer(!showAnswer)
  return (
    <div>
      <ScrollTopAndComment />
      <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
        <div className="space-y-5 xl:col-span-3">
          <div className="space-y-6">
            <div>
              <button onClick={onClick} className="text-2xl font-bold leading-8 tracking-tight">
                {question}
              </button>
            </div>
            <div className="prose max-w-none text-gray-500 dark:text-gray-400">
              {showAnswer ? <div>{answer}</div> : null}
            </div>
          </div>
          <div className="text-base font-medium leading-6"></div>
        </div>
      </div>
    </div>
  )
}

export default function Home({ questions }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            FAQ
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!questions.length && 'No posts found.'}
          {questions.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { question, answer } = frontMatter
            return (
              <li key={question} className="py-12">
                <Question question={question} answer={answer} />
              </li>
            )
          })}
        </ul>
      </div>
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
