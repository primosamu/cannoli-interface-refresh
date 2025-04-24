
import { Layout } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import EntityCard from "@/components/system-entities/EntityCard";

const entitiesData = {
  entities: [
    {
      name: "User",
      description: "Representa um usuário do sistema com acesso via autenticação JWT.",
      fields: [
        {
          name: "id",
          type: "uuid",
          required: true,
          label: "ID do Usuário"
        },
        {
          name: "name",
          type: "string",
          required: true,
          label: "Nome Completo",
          message: "O nome do usuário é obrigatório."
        },
        {
          name: "email",
          type: "string",
          required: true,
          label: "Email",
          message: "O email é obrigatório."
        },
        {
          name: "password",
          type: "string",
          required: true,
          label: "Senha",
          message: "A senha é obrigatória."
        },
        {
          name: "status",
          type: "enum",
          values: ["Ativo", "Inativo"],
          required: true,
          label: "Status",
          message: "O status do usuário é obrigatório."
        }
      ],
      relationships: [
        {
          type: "many-to-one",
          entity: "Profile",
          foreignKey: "profileId",
          required: true,
          label: "Perfil de Acesso",
          message: "O perfil do usuário é obrigatório."
        }
      ]
    },
    {
      name: "Profile",
      description: "Representa o perfil de acesso de um usuário, como Admin, Suporte, Diretor, etc.",
      fields: [
        {
          name: "id",
          type: "uuid",
          required: true,
          label: "ID do Perfil"
        },
        {
          name: "name",
          type: "string",
          required: true,
          label: "Nome do Perfil",
          message: "O nome do perfil é obrigatório."
        },
        {
          name: "description",
          type: "string",
          required: false,
          label: "Descrição"
        }
      ],
      relationships: []
    },
    {
      name: "Module",
      description: "Representa as entidades (tabelas, módulos ou telas) disponíveis no sistema.",
      fields: [
        {
          name: "id",
          type: "uuid",
          required: true,
          label: "ID da Entidade"
        },
        {
          name: "name",
          type: "string",
          required: true,
          label: "Nome da Entidade",
          message: "O nome da entidade é obrigatório."
        },
        {
          name: "description",
          type: "string",
          required: false,
          label: "Descrição da Entidade"
        }
      ],
      relationships: []
    },
    {
      name: "AccessLevel",
      description: "Define os níveis de acesso permitidos para um perfil, por entidade, considerando escopo hierárquico.",
      fields: [
        {
          name: "id",
          type: "uuid",
          required: true,
          label: "ID da Permissão"
        },
        {
          name: "canRead",
          type: "boolean",
          required: false,
          label: "Pode Visualizar"
        },
        {
          name: "canCreate",
          type: "boolean",
          required: false,
          label: "Pode Criar"
        },
        {
          name: "canUpdate",
          type: "boolean",
          required: false,
          label: "Pode Atualizar"
        },
        {
          name: "canDelete",
          type: "boolean",
          required: false,
          label: "Pode Excluir"
        },
        {
          name: "scope",
          type: "enum",
          values: ["Global", "Grupo Econômico", "Marca", "Loja"],
          required: true,
          label: "Escopo",
          message: "O escopo da permissão é obrigatório."
        }
      ],
      relationships: [
        {
          type: "many-to-one",
          entity: "Profile",
          foreignKey: "profileId",
          required: true,
          label: "Perfil",
          message: "O perfil é obrigatório."
        },
        {
          type: "many-to-one",
          entity: "Module",
          foreignKey: "moduleId",
          required: true,
          label: "Entidade",
          message: "A entidade é obrigatória."
        }
      ]
    }
  ]
};

const ConfiguracoesPage = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layout className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Estrutura do Sistema</h1>
        </div>
      </div>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Entidades do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="entities">
              <AccordionTrigger>Diagrama de Entidades</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  {entitiesData.entities.map((entity) => (
                    <EntityCard key={entity.name} entity={entity} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfiguracoesPage;

