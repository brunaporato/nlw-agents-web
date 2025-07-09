import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCreateQuestion } from "@/http/use-create-question";

const createQuestionSchema = z.object({
  question: z
    .string()
    .min(1, "You have to ask a question")
    .min(10, "Your question must have at least 10 characters")
    .max(500, "Your question must have at most 500 characters"),
});

type CreateQuestionFormData = z.infer<typeof createQuestionSchema>;

interface QuestionFormProps {
  roomId: string;
}

export function QuestionForm({ roomId }: QuestionFormProps) {
  const { mutateAsync: createQuestion } = useCreateQuestion(roomId);

  const form = useForm<CreateQuestionFormData>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      question: "",
    },
  });

  async function handleCreateQuestion(data: CreateQuestionFormData) {
    await createQuestion(data);
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ask a question</CardTitle>
        <CardDescription>
          Type your question below and submit it to get an answer from an AI
          Agent.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleCreateQuestion)}
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your question</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[100px]"
                      placeholder="What would you like to know?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit question</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
