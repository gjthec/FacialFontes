#!/bin/bash
output=$(./verificaMapa.sh)
# Conte o número de linhas na saída
line_count=$(echo "$output" | wc -l)
# Verifique se o número de linhas é maior que 3
if [ "$line_count" -gt 1 ]; then
    echo "====================================================================" 
    echo "Conteúdo do mapa:" 
    echo "$output" 
    echo "====================================================================" 
    echo "Pressione qualquer tecla para sair..." 
    read -n 1 -s   
    exit 1 
else
    echo "Mapa correto, continuando a geração." 
fi
cd ..
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_nobuntu
ssh -T git@github.com


rm -rf frontend
rm -rf backend
git clone git@github.com:nobuntu-br/frontend
git clone git@github.com:nobuntu-br/backend
cd backend
npm i
find . -type d -name ".git" -exec rm -rf {} +
cd ..
cd frontend
find . -type d -name ".git" -exec rm -rf {} + 
ng add @angular/material
npm install bootstrap@4.1.3 jquery@3.3.1 popper.js@1.14.3 --save 
cd src/app
mkdir modules
mkdir consultas
cd ../../..
mkdir frontend/src/environments
mkdir frontend/src/assets/dicionario
mkdir frontend/src/assets/dicionario/consulta
mkdir frontend/src/assets/dicionario/dashboard
mkdir frontend/src/assets/dicionario/menu
cd frontend
npm install
cd ..
cd frontend/src/app/modules/
ng g m teste --routing
cd teste
ng g c TesteForm
ng g c ListTeste
mkdir shared
cd ..
cd ..
cd consultas
cd ../..
cd ../..
mi g app mean indexSequelize > backend/src/infra/database/sequelize/models/index.ts
mi g app mean indexMongoose > backend/src/infra/database/mongoose/models//index.ts
mi g app mean index > backend/src/infra/http/routes/index.ts
mi g app angular appModule > frontend/src/app/app.module.ts
mi g app angular appRouting > frontend/src/app/app-routing.module.ts
mi g app angular appComponentHTML > frontend/src/app/app.component.html
mi g app angular appComponentTS > frontend/src/app/app.component.ts
mi g app angular indexHTML > frontend/src/index.html
mapperidea generate app mean validator entityName=Teste > backend/src/infra/http/validators/teste.validator.ts
mapperidea generate app mean sequelizeModel entityName=Teste > backend/src/infra/database/sequelize/models/teste.model.ts
mapperidea generate app mean mongoModel entityName=Teste > backend/src/infra/database/mongoose/models/teste.model.ts
mapperidea generate app mean model entityName=Teste > backend/src/domain/entities/teste.model.ts
mi g app json jsonClass entityName=Teste > frontend/src/assets/dicionario/teste.json
mapperidea generate app mean repository entityName=Teste > backend/src/domain/repositories/teste.repository.ts
mapperidea generate app mean apiController entityName=Teste > backend/src/infra/http/controllers/teste.controller.ts
mapperidea generate app angular model entityName=Teste > frontend/src/app/modules/teste/shared/teste.model.ts
mi g app angular dataService entityName=Teste > frontend/src/app/modules/teste/shared/teste.service.ts
mi g app angular appRoutingChild entityName=Teste > frontend/src/app/modules/teste/teste-routing.module.ts
mi g app mean routes entityName=Teste > backend/src/infra/http/routes/teste.route.ts
mi g app angular listComponentHTML listName=Teste >  frontend/src/app/modules/teste/list-teste/list-teste.component.html
mi g app angular listComponentTS listName=Teste >  frontend/src/app/modules/teste/list-teste/list-teste.component.ts
mi g app angular detailsComponentHTML editorName=Teste >  frontend/src/app/modules/teste/teste-form/teste-form.component.html
mi g app angular detailsComponentTS editorName=Teste >  frontend/src/app/modules/teste/teste-form/teste-form.component.ts
mi g app json jsonClass entityName=Teste > frontend/src/assets/dicionario/teste.json
mi g app json jsonTransloco translate=en > frontend/src/assets/i18n/en.json
mi g app json jsonTransloco translate=pt > frontend/src/assets/i18n/pt.json
mi g app angular environment > frontend/src/environments/environment.ts
mi g app angular environment > frontend/src/environments/environment.development.ts
mi g app mean envBackend > backend/.env
mi g app mean routeConsultas > backend/src/infra/http/routes/consulta.route.ts
mi g app mean controllerConsultas > backend/src/infra/http/controllers/consulta.controller.ts
mi g app mean serviceConsultas > backend/src/domain/services/consulta.service.ts
mi g app mean repositoryConsultas > backend/src/domain/repositories/consulta.repository.ts
mi g app mean routeRelatorios > backend/src/infra/http/routes/dashboard.route.ts
mi g app mean controllerRelatorios > backend/src/infra/http/controllers/dashboard.controller.ts
mi g app json jsonMenu menuName=home > frontend/src/assets/dicionario/menu/home.json
mi g app json jsonMenu menuName=home > backend/src/resources/menu/home.json
