import { optional } from '@/lib/optional';
import { vars } from '@/lib/vars';

export * from '@/lib/error';
export * from '@/lib/optional';
export * from '@/lib/vars';

const env = vars(['OPENAI_API_KEY', optional('PORT')] as const);
//    ^?
