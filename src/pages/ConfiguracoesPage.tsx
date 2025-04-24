
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
      name: "EconomicGroup",
      description: "Representa um conglomerado ou grupo empresarial que controla diversas marcas e unidades.",
      fields: [
        {
          name: "id",
          type: "uuid",
          required: true,
          label: "ID do Grupo Econômico"
        },
        {
          name: "name",
          type: "string",
          required: true,
          label: "Nome do Grupo Econômico",
          message: "O nome do grupo econômico é obrigatório."
        },
        {
          name: "taxId",
          type: "string",
          required: true,
          label: "CNPJ ou Número de Identificação Fiscal",
          message: "O CNPJ é obrigatório e deve ser válido."
        },
        {
          name: "legalName",
          type: "string",
          required: false,
          label: "Razão Social"
        },
        {
          name: "logoUrl",
          type: "string",
          required: false,
          label: "Logo"
        },
        {
          name: "headquartersAddress",
          type: "string",
          required: false,
          label: "Endereço da Sede"
        },
        {
          name: "mainPhone",
          type: "string",
          required: false,
          label: "Telefone Principal"
        },
        {
          name: "corporateEmail",
          type: "string",
          required: false,
          label: "Email Corporativo"
        },
        {
          name: "website",
          type: "string",
          required: false,
          label: "Website"
        },
        {
          name: "foundationDate",
          type: "date",
          required: false,
          label: "Data de Fundação"
        },
        {
          name: "legalRepresentative",
          type: "string",
          required: false,
          label: "Representante Legal"
        },
        {
          name: "mainActivities",
          type: "string",
          required: false,
          label: "Atividades Econômicas Principais"
        },
        {
          name: "notes",
          type: "text",
          required: false,
          label: "Observações Gerais"
        },
        {
          name: "status",
          type: "enum",
          values: ["Ativo", "Inativo", "Em Auditoria"],
          required: true,
          label: "Status do Grupo",
          message: "O status do grupo é obrigatório."
        }
      ],
      relationships: []
    },
    {
      name: "Brand",
      description: "Representa cada marca ou linha de produtos que pertence a um grupo econômico.",
      fields: [
        {
          name: "id",
          type: "uuid",
          required: true,
          label: "ID da Marca"
        },
        {
          name: "name",
          type: "string",
          required: true,
          label: "Nome da Marca",
          message: "O nome da marca é obrigatório."
        },
        {
          name: "logoUrl",
          type: "string",
          required: false,
          label: "Logo da Marca"
        },
        {
          name: "description",
          type: "text",
          required: false,
          label: "Descrição da Marca"
        },
        {
          name: "taxId",
          type: "string",
          required: false,
          label: "CNPJ ou Identificação Fiscal da Marca"
        },
        {
          name: "marketSector",
          type: "string",
          required: false,
          label: "Setor de Atuação"
        },
        {
          name: "mainAddress",
          type: "string",
          required: false,
          label: "Endereço Principal"
        },
        {
          name: "contactPhone",
          type: "string",
          required: false,
          label: "Telefone de Contato"
        },
        {
          name: "businessEmail",
          type: "string",
          required: false,
          label: "Email Comercial"
        },
        {
          name: "website",
          type: "string",
          required: false,
          label: "Website"
        },
        {
          name: "creationDate",
          type: "date",
          required: false,
          label: "Data de Criação"
        },
        {
          name: "status",
          type: "enum",
          values: ["Ativa", "Inativa"],
          required: true,
          label: "Status",
          message: "O status da marca é obrigatório."
        }
      ],
      relationships: [
        {
          type: "many-to-one",
          entity: "EconomicGroup",
          foreignKey: "economicGroupId",
          required: true,
          label: "Grupo Econômico",
          message: "A marca precisa estar vinculada a um grupo econômico."
        }
      ]
    },
    {
      name: "Store",
      description: "Representa a estrutura física e operacional de cada marca, incluindo as várias unidades associadas.",
      fields: [
        {
          name: "id",
          type: "uuid",
          required: true,
          label: "ID da Loja"
        },
        {
          name: "name",
          type: "string",
          required: true,
          label: "Nome da Loja",
          message: "O nome da loja é obrigatório."
        },
        {
          name: "taxId",
          type: "string",
          required: true,
          label: "CNPJ ou Identificação Fiscal",
          message: "O CNPJ da loja é obrigatório."
        },
        {
          name: "locations",
          type: "text",
          required: true,
          label: "Localizações",
          message: "As localizações da loja são obrigatórias."
        },
        {
          name: "unitManager",
          type: "string",
          required: false,
          label: "Gerente da Unidade"
        },
        {
          name: "contactPhone",
          type: "string",
          required: false,
          label: "Telefone de Contato"
        },
        {
          name: "contactEmail",
          type: "string",
          required: false,
          label: "Email de Contato"
        },
        {
          name: "openingHours",
          type: "string",
          required: false,
          label: "Horário de Funcionamento"
        },
        {
          name: "openingDate",
          type: "date",
          required: false,
          label: "Data de Início de Operação"
        },
        {
          name: "status",
          type: "enum",
          values: ["Ativa", "Inativa"],
          required: true,
          label: "Status",
          message: "O status da loja é obrigatório."
        },
        {
          name: "notes",
          type: "text",
          required: false,
          label: "Observações Gerais"
        },
        {
          name: "coverageArea",
          type: "string",
          required: false,
          label: "Área de Cobertura"
        }
      ],
      relationships: [
        {
          type: "many-to-one",
          entity: "Brand",
          foreignKey: "brandId",
          required: true,
          label: "Marca Associada",
          message: "A loja precisa estar vinculada a uma marca."
        },
        {
          type: "many-to-one",
          entity: "EconomicGroup",
          foreignKey: "economicGroupId",
          required: true,
          label: "Grupo Econômico",
          message: "A loja precisa estar vinculada a um grupo econômico."
        }
      ]
    },
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

